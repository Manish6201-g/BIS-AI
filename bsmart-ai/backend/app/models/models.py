import datetime
import uuid
from sqlalchemy import (
    Column, String, Integer, Boolean, Text, DateTime, ForeignKey, Float
)
from sqlalchemy.orm import relationship
from app.database.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default="consumer")  # 'consumer', 'industry', 'admin'
    organization = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    workflows = relationship("CertificationWorkflow", back_populates="user")
    chat_sessions = relationship("ChatSession", back_populates="user")

class Standard(Base):
    __tablename__ = "standards"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    is_number = Column(String(100), unique=True, index=True, nullable=False)  # e.g., IS 269:2015
    title = Column(String(255), nullable=False)
    year = Column(Integer, nullable=True)
    category = Column(String(100), index=True, nullable=False)  # e.g. Civil, Mechanical, Food
    scope = Column(Text, nullable=True)
    status = Column(String(50), default="Active")  # Active, Under Revision
    mandatory_status = Column(Boolean, default=False)
    qco_reference = Column(String(255), nullable=True)
    source_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    clauses = relationship("StandardClause", back_populates="standard", cascade="all, delete-orphan")
    products = relationship("Product", back_populates="applicable_standard")
    chunks = relationship("DocumentChunk", back_populates="standard")

class StandardClause(Base):
    __tablename__ = "standard_clauses"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    standard_id = Column(String(36), ForeignKey("standards.id"), nullable=False, index=True)
    clause_number = Column(String(50), index=True, nullable=False)  # e.g. "5.2", "4.1.1"
    title = Column(String(255), nullable=True)
    content = Column(Text, nullable=False)
    page_number = Column(Integer, default=1)
    is_mandatory = Column(Boolean, default=True)

    # Relationships
    standard = relationship("Standard", back_populates="clauses")

class Product(Base):
    __tablename__ = "products"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), index=True, nullable=False)  # e.g., "Pressure Cooker", "OPC 43 Cement"
    category = Column(String(100), index=True, nullable=False)
    sub_category = Column(String(100), nullable=True)
    material = Column(String(150), nullable=True)
    capacity = Column(String(100), nullable=True)
    intended_use = Column(Text, nullable=True)
    applicable_standard_id = Column(String(36), ForeignKey("standards.id"), nullable=True)
    qco_order_name = Column(String(255), nullable=True)
    qco_date = Column(String(100), nullable=True)
    mandatory_certification = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    applicable_standard = relationship("Standard", back_populates="products")
    workflows = relationship("CertificationWorkflow", back_populates="product")

class Document(Base):
    __tablename__ = "documents"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    document_type = Column(String(50), default="Standard")  # Standard, QCO, Manual, Guideline
    is_number = Column(String(100), nullable=True)
    file_path = Column(String(500), nullable=True)
    file_size = Column(Integer, default=0)
    upload_date = Column(DateTime, default=datetime.datetime.utcnow)
    status = Column(String(50), default="Processed")  # Uploaded, Processing, Processed, Failed

    # Relationships
    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")

class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    document_id = Column(String(36), ForeignKey("documents.id"), nullable=True, index=True)
    standard_id = Column(String(36), ForeignKey("standards.id"), nullable=True, index=True)
    clause_id = Column(String(36), nullable=True)
    clause_number = Column(String(50), nullable=True)
    page_number = Column(Integer, default=1)
    chunk_index = Column(Integer, default=0)
    content = Column(Text, nullable=False)
    embedding_json = Column(Text, nullable=True)  # Serialized vector representation for flexible store

    # Relationships
    document = relationship("Document", back_populates="chunks")
    standard = relationship("Standard", back_populates="chunks")

class QCO(Base):
    __tablename__ = "qcos"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    order_name = Column(String(255), unique=True, index=True, nullable=False)
    ministry = Column(String(255), nullable=False)
    notification_date = Column(String(50), nullable=True)
    enforcement_date = Column(String(50), nullable=True)
    is_numbers = Column(Text, nullable=False)  # Comma-separated or JSON list of IS numbers
    products_covered = Column(Text, nullable=False)
    summary = Column(Text, nullable=True)
    penalties_summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class CertificationWorkflow(Base):
    __tablename__ = "certification_workflows"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True, index=True)
    product_id = Column(String(36), ForeignKey("products.id"), nullable=True)
    standard_id = Column(String(36), ForeignKey("standards.id"), nullable=True)
    current_step = Column(Integer, default=1)  # 1 to 10
    step_data_json = Column(Text, default="{}")  # Stores inputs for each step in JSON
    status = Column(String(50), default="in_progress")  # in_progress, completed
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="workflows")
    product = relationship("Product", back_populates="workflows")

class VerificationRecord(Base):
    __tablename__ = "verification_records"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    verification_type = Column(String(20), index=True, nullable=False)  # 'ISI' or 'HUID'
    query_identifier = Column(String(100), index=True, nullable=False)  # CM/L number or HUID code
    result_status = Column(String(50), nullable=False)  # 'VERIFIED', 'UNVERIFIED', 'MISMATCH'
    metadata_json = Column(Text, nullable=True)  # Additional verified details
    verified_at = Column(DateTime, default=datetime.datetime.utcnow)

class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    title = Column(String(255), default="New BIS Conversation")
    language = Column(String(10), default="en")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="chat_sessions")
    messages = relationship("ChatMessage", back_populates="session", cascade="all, delete-orphan")

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    session_id = Column(String(36), ForeignKey("chat_sessions.id"), nullable=False, index=True)
    role = Column(String(20), nullable=False)  # 'user' or 'assistant'
    content = Column(Text, nullable=False)
    language = Column(String(10), default="en")
    query_classification = Column(String(50), nullable=True)
    citations_json = Column(Text, nullable=True)  # Array of citations
    audio_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    session = relationship("ChatSession", back_populates="messages")
    feedback = relationship("Feedback", back_populates="message", cascade="all, delete-orphan")

class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    message_id = Column(String(36), ForeignKey("chat_messages.id"), nullable=True, index=True)
    rating = Column(Integer, nullable=False)  # 1 (up) or -1 (down)
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    message = relationship("ChatMessage", back_populates="feedback")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), nullable=True)
    action = Column(String(100), nullable=False)
    endpoint = Column(String(255), nullable=True)
    details_json = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
