from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.schemas import ProductMatchRequest, ProductMatchResponse
from app.services.product_matcher_service import product_matcher

router = APIRouter(prefix="/product", tags=["Product Matcher"])

@router.post("/match-standard", response_model=ProductMatchResponse)
def match_product_standard(
    payload: ProductMatchRequest,
    db: Session = Depends(get_db)
):
    return product_matcher.match_product(
        product_name=payload.product_name,
        category=payload.category,
        material=payload.material,
        capacity=payload.capacity,
        intended_use=payload.intended_use,
        db=db
    )
