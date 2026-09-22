import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.database.database import init_db, engine, Base
from app.api import auth, chat, standards, product_matcher, certification, verify, documents, feedback, analytics, admin_users

app = FastAPI(
    title=settings.APP_NAME,
    description="BISmart AI – AI-Powered Intelligent Assistant for Indian Standards and BIS Services (SIH26107)",
    version="1.0.0"
)

# CORS Configuration for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Database Schema
@app.on_event("startup")
def on_startup():
    init_db()
    # Check if seed script should run automatically
    from scripts.seed_data import seed_database
    try:
        seed_database()
    except Exception as e:
        print(f"Database seed note: {e}")

    # Connect to MongoDB Atlas if URI is provided
    from app.database.mongodb import mongo_manager
    if settings.MONGODB_URI:
        mongo_manager.connect(settings.MONGODB_URI)

# Include API Routers
app.include_router(auth.router, prefix="/api")
app.include_router(chat.router, prefix="/api")
app.include_router(standards.router, prefix="/api")
app.include_router(product_matcher.router, prefix="/api")
app.include_router(certification.router, prefix="/api")
app.include_router(verify.router, prefix="/api")
app.include_router(documents.router, prefix="/api")
app.include_router(feedback.router, prefix="/api")
app.include_router(analytics.router, prefix="/api")
app.include_router(admin_users.router, prefix="/api")

@app.get("/")
def root():
    return {
        "service": "BISmart AI API",
        "problem_statement": "SIH26107",
        "status": "Operational",
        "version": "1.0.0",
        "docs_url": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "rag_engine": "ready",
        "bhashini_services": "active"
    }
