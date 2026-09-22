import os
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    APP_NAME: str = "BISmart AI"
    APP_ENV: str = "development"
    DEBUG: bool = True
    PORT: int = 8000
    
    # Database
    DATABASE_URL: str = "sqlite:///./bismart.db"
    MONGODB_URI: Optional[str] = None
    
    # Security
    JWT_SECRET: str = "bismart_super_secret_jwt_key_sih2026_secure_random_string_xyz"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30  # 30 minutes for security
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days
    
    # AI / LLM Configuration
    LLM_API_KEY: Optional[str] = "demo"
    LLM_PROVIDER: str = "gemini"
    LLM_MODEL: str = "gemini-1.5-flash"
    
    # Bhashini / Speech Services
    BHASHINI_API_KEY: Optional[str] = "demo"
    BHASHINI_USER_ID: Optional[str] = "demo_user"
    BHASHINI_PIPELINE_ID: Optional[str] = "demo_pipeline"
    BIS_OFFICIAL_API_URL: str = "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/"
    
    # Storage
    UPLOAD_DIR: str = "./data/documents"

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()

os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
