import json
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from typing import Optional, List
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.schemas import ChatRequest, ChatResponse
from app.rag.engine import rag_engine
from app.models.models import ChatSession, ChatMessage, User
from app.auth.security import get_current_user
from app.services.bhashini_service import bhashini

router = APIRouter(prefix="/chat", tags=["AI Assistant"])

@router.post("", response_model=ChatResponse)
def chat_with_assistant(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user)
):
    # Ensure or create session
    session = None
    if request.session_id:
        session = db.query(ChatSession).filter(ChatSession.id == request.session_id).first()
    
    if not session:
        session = ChatSession(
            user_id=current_user.id if current_user else None,
            title=request.query[:50] or "BIS Query",
            language=request.language
        )
        db.add(session)
        db.commit()
        db.refresh(session)

    # Save user message
    user_msg = ChatMessage(
        session_id=session.id,
        role="user",
        content=request.query,
        language=request.language
    )
    db.add(user_msg)
    db.commit()

    # Run RAG pipeline
    rag_response = rag_engine.process_query(
        query=request.query,
        requested_lang=request.language,
        db=db
    )
    rag_response.session_id = session.id

    # Save assistant response with structured citations
    citations_data = [c.dict() for c in rag_response.sources]
    asst_msg = ChatMessage(
        session_id=session.id,
        role="assistant",
        content=rag_response.answer,
        language=rag_response.language,
        query_classification=rag_response.query_classification,
        citations_json=json.dumps(citations_data)
    )
    db.add(asst_msg)
    db.commit()

    return rag_response

@router.get("/history")
def get_chat_history(
    session_id: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user)
):
    if session_id:
        messages = db.query(ChatMessage).filter(ChatMessage.session_id == session_id).order_by(ChatMessage.created_at.asc()).all()
        result = []
        for m in messages:
            citations = []
            if m.citations_json:
                try:
                    citations = json.loads(m.citations_json)
                except:
                    citations = []
            result.append({
                "id": m.id,
                "role": m.role,
                "content": m.content,
                "language": m.language,
                "query_classification": m.query_classification,
                "citations": citations,
                "created_at": m.created_at
            })
        return result
    
    # Return list of sessions
    query = db.query(ChatSession)
    if current_user:
        query = query.filter(ChatSession.user_id == current_user.id)
    sessions = query.order_by(ChatSession.created_at.desc()).limit(20).all()
    return [{"id": s.id, "title": s.title, "language": s.language, "created_at": s.created_at} for s in sessions]

@router.post("/voice-transcribe")
async def voice_transcribe(
    file: Optional[UploadFile] = File(None),
    language: str = "hi"
):
    """Bhashini-compatible audio transcription endpoint"""
    return {
        "text": "प्रेशर कुकर पर कौन सा बीआईएस मानक लागू होता है?",
        "detected_language": language,
        "status": "success",
        "service": "Bhashini Digital India ASR Engine (Mock)"
    }
