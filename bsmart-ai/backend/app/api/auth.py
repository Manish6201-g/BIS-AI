from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
from app.database.database import get_db
from app.models.models import User, RefreshToken
from app.schemas.schemas import (
    UserCreate, UserLogin, UserUpdate, UserResponse, Token, RefreshTokenRequest
)
from app.auth.security import (
    verify_password, get_password_hash, create_access_token, 
    create_refresh_token, get_current_user, get_current_active_user
)

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=Token)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered"
        )
    
    new_user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role=user_in.role,
        organization=user_in.organization,
        is_active=True,
        is_verified=False
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token({"sub": new_user.id, "email": new_user.email, "role": new_user.role})
    refresh_token = create_refresh_token(new_user.id, db)
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        user=UserResponse.from_orm(new_user)
    )

@router.post("/login", response_model=Token)
def login(login_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    if not user or not verify_password(login_data.password, user.hashed_password):
        # Update failed attempts (optional feature implementation)
        if user:
            user.failed_login_attempts += 1
            db.commit()
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )

    if not user.is_active:
        raise HTTPException(status_code=400, detail="User account is deactivated")

    # Reset failed attempts and update last login
    user.failed_login_attempts = 0
    user.last_login = datetime.utcnow()
    db.commit()

    access_token = create_access_token({"sub": user.id, "email": user.email, "role": user.role})
    refresh_token = create_refresh_token(user.id, db)
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        user=UserResponse.from_orm(user)
    )

@router.post("/refresh", response_model=Token)
def refresh_token(refresh_data: RefreshTokenRequest, db: Session = Depends(get_db)):
    db_token = db.query(RefreshToken).filter(
        RefreshToken.token == refresh_data.refresh_token,
        RefreshToken.revoked_at == None,
        RefreshToken.expires_at > datetime.utcnow()
    ).first()
    
    if not db_token:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")
    
    user = db_token.user
    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="User not found or inactive")
    
    # Generate new pair
    access_token = create_access_token({"sub": user.id, "email": user.email, "role": user.role})
    # Optional: Rotate refresh token
    new_refresh_token = create_refresh_token(user.id, db)
    
    # Revoke old one
    db_token.revoked_at = datetime.utcnow()
    db.commit()
    
    return Token(
        access_token=access_token,
        refresh_token=new_refresh_token,
        token_type="bearer",
        user=UserResponse.from_orm(user)
    )

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_active_user)):
    return UserResponse.from_orm(current_user)

@router.put("/me", response_model=UserResponse)
def update_me(user_update: UserUpdate, current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    if user_update.email and user_update.email != current_user.email:
        existing = db.query(User).filter(User.email == user_update.email).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email already in use")
        current_user.email = user_update.email
    
    if user_update.full_name:
        current_user.full_name = user_update.full_name
    if user_update.organization:
        current_user.organization = user_update.organization
    if user_update.password:
        current_user.hashed_password = get_password_hash(user_update.password)
        
    db.commit()
    db.refresh(current_user)
    return UserResponse.from_orm(current_user)

@router.post("/logout")
def logout(refresh_data: RefreshTokenRequest, db: Session = Depends(get_db)):
    db_token = db.query(RefreshToken).filter(RefreshToken.token == refresh_data.refresh_token).first()
    if db_token:
        db_token.revoked_at = datetime.utcnow()
        db.commit()
    return {"message": "Successfully logged out"}
