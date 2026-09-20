import os
import shutil
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from typing import List, Optional
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import Document, DocumentChunk, User
from app.schemas.schemas import DocumentUploadResponse
from app.ingestion.parser import document_parser
from app.auth.security import require_role
from app.config import settings

router = APIRouter(prefix="", tags=["Document Knowledge Base"])

@router.post("/documents/upload", response_model=DocumentUploadResponse)
async def upload_document(
    title: str = Form(...),
    document_type: str = Form("Standard"),
    is_number: Optional[str] = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    safe_filename = f"{title.replace(' ', '_')}_{file.filename}"
    file_path = os.path.join(settings.UPLOAD_DIR, safe_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    doc = document_parser.ingest_document(
        title=title,
        document_type=document_type,
        file_path=file_path,
        is_number=is_number,
        db=db
    )

    chunks_count = db.query(DocumentChunk).filter(DocumentChunk.document_id == doc.id).count()

    return DocumentUploadResponse(
        document_id=doc.id,
        title=doc.title,
        document_type=doc.document_type,
        chunks_created=chunks_count,
        status=doc.status
    )

@router.get("/admin/documents")
def list_admin_documents(db: Session = Depends(get_db)):
    docs = db.query(Document).order_by(Document.upload_date.desc()).all()
    results = []
    for d in docs:
        chunks_count = db.query(DocumentChunk).filter(DocumentChunk.document_id == d.id).count()
        results.append({
            "id": d.id,
            "title": d.title,
            "document_type": d.document_type,
            "is_number": d.is_number,
            "upload_date": d.upload_date,
            "status": d.status,
            "chunks_count": chunks_count,
            "file_size": d.file_size
        })
    return results

@router.delete("/admin/documents/{doc_id}")
def delete_admin_document(doc_id: str, db: Session = Depends(get_db)):
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    if doc.file_path and os.path.exists(doc.file_path):
        try:
            os.remove(doc.file_path)
        except:
            pass
    db.delete(doc)
    db.commit()
    return {"message": "Document deleted successfully", "id": doc_id}
