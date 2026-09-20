import json
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.models import CertificationWorkflow, Product, Standard
from app.schemas.schemas import CertificationWorkflowResponse

STEP_METADATA = {
    1: {"title": "Select Product & Category", "description": "Specify the manufactured or imported product and intended use."},
    2: {"title": "Applicable Indian Standard", "description": "Identify the relevant IS code, revision year, and technical scope."},
    3: {"title": "Mandatory Certification Check", "description": "Determine if product is under Scheme-I (ISI Mark) or Scheme-II (CRS)."},
    4: {"title": "Applicable Quality Control Order (QCO)", "description": "Review DPIIT/Ministry statutory notification and enforcement deadlines."},
    5: {"title": "Manufacturer & Factory Details", "description": "Input manufacturing unit address, machinery list, and quality management details."},
    6: {"title": "Required Documents Checklist", "description": "Verify required BIS attachments: Form-V, factory layout, test records, MSME cert."},
    7: {"title": "Testing & Laboratory Requirements", "description": "Evaluate required in-house test equipment and Scheme of Inspection & Testing (SIT)."},
    8: {"title": "Application Submission Guidance", "description": "Portal walkthrough for Manakonline e-filing and official fee schedules."},
    9: {"title": "Pre-Audit Self Assessment", "description": "Final readiness checklist before the BIS technical auditor visit."},
    10: {"title": "Compliance Summary & Certificate", "description": "Download audit-ready summary report and certification roadmap."}
}

class CertificationService:
    @staticmethod
    def start_workflow(
        user_id: Optional[str],
        product_name: str,
        is_number: Optional[str],
        db: Session
    ) -> CertificationWorkflow:
        initial_data = {
            "step_1": {"product_name": product_name},
            "step_2": {"is_number": is_number or "Auto-detected from database"},
            "step_3": {"mandatory": True, "scheme": "Scheme-I (ISI Mark)"},
            "step_4": {"qco_checked": True},
            "step_5": {},
            "step_6": {"documents_verified": []},
            "step_7": {"lab_equipment_installed": True},
            "step_8": {"portal": "manakonline.in"},
            "step_9": {"checklist_completed": False},
            "step_10": {"report_generated": False}
        }
        
        workflow = CertificationWorkflow(
            user_id=user_id,
            current_step=1,
            step_data_json=json.dumps(initial_data),
            status="in_progress"
        )
        db.add(workflow)
        db.commit()
        db.refresh(workflow)
        return workflow

    @staticmethod
    def update_step(
        workflow_id: str,
        step: int,
        data: Dict[str, Any],
        db: Session
    ) -> Optional[CertificationWorkflow]:
        workflow = db.query(CertificationWorkflow).filter(CertificationWorkflow.id == workflow_id).first()
        if not workflow:
            return None
        
        current_data = json.loads(workflow.step_data_json or "{}")
        current_data[f"step_{step}"] = data
        
        workflow.step_data_json = json.dumps(current_data)
        if step >= workflow.current_step and step < 10:
            workflow.current_step = step + 1
        elif step == 10:
            workflow.current_step = 10
            workflow.status = "completed"
            
        db.commit()
        db.refresh(workflow)
        return workflow

    @staticmethod
    def generate_summary(workflow_id: str, db: Session) -> Dict[str, Any]:
        workflow = db.query(CertificationWorkflow).filter(CertificationWorkflow.id == workflow_id).first()
        if not workflow:
            return {"error": "Workflow not found"}
        
        data = json.loads(workflow.step_data_json or "{}")
        p_name = data.get("step_1", {}).get("product_name", "Specified Industrial Product")
        is_code = data.get("step_2", {}).get("is_number", "IS Standard")
        
        return {
            "workflow_id": workflow.id,
            "product_name": p_name,
            "applicable_standard": is_code,
            "status": workflow.status,
            "certification_scheme": "BIS Scheme-I (ISI Mark) / Product Certification",
            "statutory_compliance": "Mandatory under Quality Control Order (QCO)",
            "estimated_timeline": "30 to 45 business days (Option-1 Normal / Option-2 Simplified)",
            "fee_structure": {
                "application_fee": "₹1,000 (Non-refundable)",
                "audit_visit_charges": "₹7,000 per auditor per day",
                "sample_testing_charges": "As per BIS schedule of testing fees",
                "annual_licence_fee": "₹1,000",
                "marking_fee": "As per relevant product gazette notification"
            },
            "required_documents_submitted": [
                "Form-V e-Application",
                "Factory Layout and Machinery List",
                "In-house Laboratory Testing Equipment List",
                "Valid Calibration Certificates",
                "Consent to Operate (Pollution Control Board)",
                "MSME / Udyam Registration Certificate (if applicable for fee concessions)"
            ],
            "step_progress": {
                step_num: {
                    "title": STEP_METADATA[step_num]["title"],
                    "completed": step_num <= workflow.current_step
                }
                for step_num in range(1, 11)
            }
        }

certification_service = CertificationService()
