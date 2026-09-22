from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.database import get_db
from app.models.models import User, AuditLog
from app.schemas.schemas import UserResponse, AdminUserUpdate
from app.auth.security import require_role, get_current_active_user

router = APIRouter(prefix="/admin/users", tags=["Admin User Management"])

# Helper to log admin actions
def log_admin_action(db: Session, admin_id: str, action: str, details: dict):
    log = AuditLog(
        user_id=admin_id,
        action=action,
        endpoint="/api/admin/users",
        details_json=str(details)
    )
    db.add(log)
    db.commit()

@router.get("/", response_model=List[UserResponse])
def list_users(
    skip: int = 0, 
    limit: int = 100, 
    role: Optional[str] = None,
    db: Session = Depends(get_db),
    admin_user: User = Depends(require_role(["admin"]))
):
    query = db.query(User)
    if role:
        query = query.filter(User.role == role)
    return query.offset(skip).limit(limit).all()

@router.get("/{user_id}", response_model=UserResponse)
def get_user_details(
    user_id: str,
    db: Session = Depends(get_db),
    admin_user: User = Depends(require_role(["admin"]))
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.patch("/{user_id}", response_model=UserResponse)
def update_user_status(
    user_id: str,
    update_data: AdminUserUpdate,
    db: Session = Depends(get_db),
    admin_user: User = Depends(require_role(["admin"]))
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if update_data.role is not None:
        user.role = update_data.role
    if update_data.is_active is not None:
        user.is_active = update_data.is_active
    if update_data.is_verified is not None:
        user.is_verified = update_data.is_verified
    
    db.commit()
    db.refresh(user)
    
    log_admin_action(db, admin_user.id, f"UPDATE_USER_{user_id}", update_data.dict())
    
    return user

@router.delete("/{user_id}")
def delete_user(
    user_id: str,
    db: Session = Depends(get_db),
    admin_user: User = Depends(require_role(["admin"]))
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Prevent deleting self
    if user.id == admin_user.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own admin account")
    
    db.delete(user)
    db.commit()
    
    log_admin_action(db, admin_user.id, f"DELETE_USER_{user_id}", {"email": user.email})
    
    return {"message": "User deleted successfully"}
