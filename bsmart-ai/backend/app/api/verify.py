from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.schemas import ISIVerifyRequest, ISIVerifyResponse, HUIDVerifyRequest, HUIDVerifyResponse
from app.services.verification_service import verification_service

router = APIRouter(prefix="/verify", tags=["Verification"])

@router.post("/isi", response_model=ISIVerifyResponse)
def verify_isi_mark(
    payload: ISIVerifyRequest,
    db: Session = Depends(get_db)
):
    result = verification_service.verify_isi(
        cml_raw=payload.cml_number,
        db=db,
        product_hint=payload.product_hint
    )
    return ISIVerifyResponse(**result)

@router.post("/huid", response_model=HUIDVerifyResponse)
def verify_huid_code(
    payload: HUIDVerifyRequest,
    db: Session = Depends(get_db)
):
    result = verification_service.verify_huid(
        huid_raw=payload.huid,
        db=db
    )
    return HUIDVerifyResponse(**result)
