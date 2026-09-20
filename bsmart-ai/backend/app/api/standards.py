from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import Standard, StandardClause
from app.schemas.schemas import StandardResponse, ClauseResponse

router = APIRouter(prefix="/standards", tags=["Standards"])

@router.get("", response_model=List[StandardResponse])
def get_standards(
    q: Optional[str] = None,
    category: Optional[str] = None,
    mandatory_only: bool = False,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    query = db.query(Standard)
    if q:
        query = query.filter(
            (Standard.is_number.ilike(f"%{q}%")) |
            (Standard.title.ilike(f"%{q}%")) |
            (Standard.category.ilike(f"%{q}%")) |
            (Standard.scope.ilike(f"%{q}%"))
        )
    if category:
        query = query.filter(Standard.category.ilike(f"%{category}%"))
    if mandatory_only:
        query = query.filter(Standard.mandatory_status == True)
        
    standards = query.order_by(Standard.is_number.asc()).limit(limit).all()
    return standards

@router.get("/{standard_id}", response_model=StandardResponse)
def get_standard_by_id(standard_id: str, db: Session = Depends(get_db)):
    std = db.query(Standard).filter(Standard.id == standard_id).first()
    if not std:
        # Check by is_number
        std = db.query(Standard).filter(Standard.is_number == standard_id).first()
    if not std:
        raise HTTPException(status_code=404, detail="Indian Standard not found")
    return std

@router.get("/{standard_id}/clauses", response_model=List[ClauseResponse])
def get_standard_clauses(
    standard_id: str,
    clause_no: Optional[str] = None,
    db: Session = Depends(get_db)
):
    std = db.query(Standard).filter(
        (Standard.id == standard_id) | (Standard.is_number == standard_id)
    ).first()
    if not std:
        raise HTTPException(status_code=404, detail="Standard not found")
    
    query = db.query(StandardClause).filter(StandardClause.standard_id == std.id)
    if clause_no:
        query = query.filter(StandardClause.clause_number.ilike(f"%{clause_no}%"))
    
    clauses = query.order_by(StandardClause.clause_number.asc()).all()
    return clauses
