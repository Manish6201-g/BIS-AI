from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import Feedback
from app.schemas.schemas import FeedbackRequest

router = APIRouter(prefix="/feedback", tags=["Feedback"])

@router.post("")
def submit_feedback(payload: FeedbackRequest, db: Session = Depends(get_db)):
    fb = Feedback(
        message_id=payload.message_id,
        rating=payload.rating,
        comment=payload.comment
    )
    db.add(fb)
    db.commit()
    return {"status": "success", "message": "Feedback recorded. Thank you for helping improve BISmart AI!"}
