import json
from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.schemas import CertificationStartRequest, CertificationStepUpdate, CertificationWorkflowResponse
from app.models.models import CertificationWorkflow, User
from app.services.certification_service import certification_service, STEP_METADATA
from app.auth.security import get_current_user

router = APIRouter(prefix="/certification", tags=["Certification Workflow"])

@router.post("/start")
def start_certification_wizard(
    payload: CertificationStartRequest,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user)
):
    workflow = certification_service.start_workflow(
        user_id=current_user.id if current_user else None,
        product_name=payload.product_name,
        is_number=payload.is_number,
        db=db
    )
    return {
        "id": workflow.id,
        "current_step": workflow.current_step,
        "step_metadata": STEP_METADATA,
        "step_data": json.loads(workflow.step_data_json),
        "status": workflow.status
    }

@router.get("/{workflow_id}")
def get_certification_status(workflow_id: str, db: Session = Depends(get_db)):
    wf = db.query(CertificationWorkflow).filter(CertificationWorkflow.id == workflow_id).first()
    if not wf:
        raise HTTPException(status_code=404, detail="Certification workflow not found")
    return {
        "id": wf.id,
        "current_step": wf.current_step,
        "step_metadata": STEP_METADATA,
        "step_data": json.loads(wf.step_data_json or "{}"),
        "status": wf.status,
        "created_at": wf.created_at,
        "updated_at": wf.updated_at
    }

@router.put("/{workflow_id}")
def update_certification_step(
    workflow_id: str,
    update_data: CertificationStepUpdate,
    db: Session = Depends(get_db)
):
    wf = certification_service.update_step(
        workflow_id=workflow_id,
        step=update_data.step,
        data=update_data.data,
        db=db
    )
    if not wf:
        raise HTTPException(status_code=404, detail="Workflow not found")
    return {
        "id": wf.id,
        "current_step": wf.current_step,
        "step_metadata": STEP_METADATA,
        "step_data": json.loads(wf.step_data_json or "{}"),
        "status": wf.status
    }

@router.post("/{workflow_id}/generate-summary")
def generate_summary(workflow_id: str, db: Session = Depends(get_db)):
    summary = certification_service.generate_summary(workflow_id=workflow_id, db=db)
    if "error" in summary:
        raise HTTPException(status_code=404, detail=summary["error"])
    return summary
