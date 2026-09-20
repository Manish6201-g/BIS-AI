from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

# --- Auth Schemas ---
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
    full_name: str
    role: str = Field("consumer", description="consumer, industry, or admin")
    organization: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    role: str
    organization: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# --- Standard & Clause Schemas ---
class ClauseResponse(BaseModel):
    id: str
    clause_number: str
    title: Optional[str] = None
    content: str
    page_number: int
    is_mandatory: bool

    class Config:
        from_attributes = True

class StandardResponse(BaseModel):
    id: str
    is_number: str
    title: str
    year: Optional[int] = None
    category: str
    scope: Optional[str] = None
    status: str
    mandatory_status: bool
    qco_reference: Optional[str] = None
    source_url: Optional[str] = None
    clauses: Optional[List[ClauseResponse]] = []

    class Config:
        from_attributes = True

class StandardSearchQuery(BaseModel):
    query: str
    category: Optional[str] = None
    mandatory_only: bool = False

# --- Product Matcher Schemas ---
class ProductMatchRequest(BaseModel):
    product_name: str
    category: Optional[str] = None
    material: Optional[str] = None
    capacity: Optional[str] = None
    intended_use: Optional[str] = None

class MatchedClauseItem(BaseModel):
    clause_number: str
    title: Optional[str]
    summary: str
    is_mandatory: bool

class ProductMatchResponse(BaseModel):
    product_name: str
    matched_standard: Optional[StandardResponse] = None
    confidence_score: float = Field(..., description="Information retrieval confidence (0.0 to 1.0)")
    why_this_standard: str
    mandatory_certification: bool
    applicable_qco: Optional[str] = None
    qco_enforcement_date: Optional[str] = None
    key_requirements: List[str] = []
    relevant_clauses: List[MatchedClauseItem] = []
    next_steps: List[str] = []

# --- Verification Schemas ---
class ISIVerifyRequest(BaseModel):
    cml_number: str = Field(..., description="CM/L licence number, e.g. CM/L-8400123 or 8400123")
    product_hint: Optional[str] = None

class ISIVerifyResponse(BaseModel):
    cml_number: str
    status: str = Field(..., description="VERIFIED, UNVERIFIED, or INVALID_MISMATCH")
    is_valid: bool
    manufacturer_name: Optional[str] = None
    factory_address: Optional[str] = None
    product_name: Optional[str] = None
    is_standard: Optional[str] = None
    valid_from: Optional[str] = None
    valid_until: Optional[str] = None
    operative_status: Optional[str] = None
    source: str = "BIS National Conformity Assessment Records (Demo Mock Data)"
    remarks: Optional[str] = None

class HUIDVerifyRequest(BaseModel):
    huid: str = Field(..., description="6-character alphanumeric code, e.g., AA1234")

class HUIDVerifyResponse(BaseModel):
    huid: str
    status: str = Field(..., description="VERIFIED, UNVERIFIED, or INVALID_FORMAT")
    is_valid: bool
    article_type: Optional[str] = None
    purity_fineness: Optional[str] = None  # e.g., "22K 916 (91.6% Pure Gold)"
    hallmarking_centre: Optional[str] = None
    ahc_registration_number: Optional[str] = None
    jeweller_registration_number: Optional[str] = None
    hallmarking_date: Optional[str] = None
    source: str = "BIS Hallmarking Portal Records (Demo Mock Data)"
    remarks: Optional[str] = None

# --- Certification Wizard Schemas ---
class CertificationStartRequest(BaseModel):
    product_id: Optional[str] = None
    standard_id: Optional[str] = None
    product_name: str
    is_number: Optional[str] = None

class CertificationStepUpdate(BaseModel):
    step: int = Field(..., ge=1, le=10)
    data: Dict[str, Any]

class CertificationWorkflowResponse(BaseModel):
    id: str
    product_id: Optional[str]
    standard_id: Optional[str]
    current_step: int
    step_data: Dict[str, Any]
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# --- Chat & RAG Schemas ---
class CitationItem(BaseModel):
    document: str
    clause: str
    page: int
    text: str
    source_url: Optional[str] = None

class ChatRequest(BaseModel):
    query: str
    language: str = "en"
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    session_id: str
    query: str
    language: str
    answer: str
    query_classification: str
    sources: List[CitationItem] = []
    audio_base64: Optional[str] = None

class FeedbackRequest(BaseModel):
    message_id: Optional[str] = None
    query: Optional[str] = None
    rating: int = Field(..., description="1 for positive, -1 for negative")
    comment: Optional[str] = None

# --- Admin & Analytics Schemas ---
class DocumentUploadResponse(BaseModel):
    document_id: str
    title: str
    document_type: str
    chunks_created: int
    status: str

class AnalyticsSummary(BaseModel):
    total_questions_asked: int
    total_standards_indexed: int
    total_certifications_started: int
    total_verifications_performed: int
    queries_by_category: Dict[str, int]
    queries_by_language: Dict[str, int]
    top_searched_standards: List[Dict[str, Any]]
    verification_stats: Dict[str, int]
