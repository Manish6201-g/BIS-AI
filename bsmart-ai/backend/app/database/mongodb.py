import os
import logging
from typing import Optional, Dict, Any
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, OperationFailure

logger = logging.getLogger("bismart.mongodb")

class MongoDBManager:
    def __init__(self):
        self.client: Optional[MongoClient] = None
        self.db = None
        self.is_connected = False
        self.uri = os.getenv("MONGODB_URI", "")

    def connect(self, uri: Optional[str] = None):
        target_uri = uri or self.uri
        if not target_uri or "<db_password>" in target_uri:
            logger.info("MongoDB URI not provided or contains placeholder <db_password>. Operating in local database mode.")
            return False

        try:
            # Fix URL formatting if /BISSystem was appended after query parameters
            cleaned_uri = target_uri
            db_name = "BISSystem"
            if "/BISSystem" in cleaned_uri and "?" in cleaned_uri:
                # If format is: ...net/?appName=Cluster0/BISSystem
                cleaned_uri = cleaned_uri.replace("/BISSystem", "")
                if ".net/?" in cleaned_uri:
                    cleaned_uri = cleaned_uri.replace(".net/?", f".net/{db_name}?")

            self.client = MongoClient(cleaned_uri, serverSelectionTimeoutMS=5000)
            # Test connection
            self.client.admin.command('ping')
            self.db = self.client[db_name]
            self.is_connected = True
            logger.info(f"Successfully connected to MongoDB Atlas database: {db_name}")
            print(f"✓ Connected to MongoDB Atlas Cloud Database: {db_name}")
            return True
        except (ConnectionFailure, OperationFailure, Exception) as e:
            logger.warning(f"Could not connect to MongoDB Atlas: {e}")
            print(f"⚠ MongoDB Atlas connection note: {e}")
            self.is_connected = False
            return False

    def sync_records_to_mongo(self, collection_name: str, records: list):
        """Sync SQL records to MongoDB Atlas for cloud persistence & analytics."""
        if not self.is_connected or self.db is None:
            return
        try:
            coll = self.db[collection_name]
            for r in records:
                # Upsert by identifier
                key = {"is_number": r.get("is_number")} if "is_number" in r else \
                      {"email": r.get("email")} if "email" in r else \
                      {"query_identifier": r.get("query_identifier")} if "query_identifier" in r else \
                      {"id": r.get("id")}
                coll.update_one(key, {"$set": r}, upsert=True)
            logger.info(f"Synced {len(records)} records to MongoDB collection '{collection_name}'")
        except Exception as e:
            logger.error(f"Error syncing to MongoDB: {e}")

    def log_chat_interaction(self, session_id: str, query: str, answer: str, language: str, citations: list):
        if not self.is_connected or self.db is None:
            return
        try:
            self.db.chat_interactions.insert_one({
                "session_id": session_id,
                "query": query,
                "answer": answer,
                "language": language,
                "citations": citations,
                "timestamp": os.getenv("CURRENT_TIME", "")
            })
        except Exception as e:
            logger.error(f"MongoDB log error: {e}")

    def log_verification(self, v_type: str, identifier: str, status: str, details: dict):
        if not self.is_connected or self.db is None:
            return
        try:
            self.db.verification_records.insert_one({
                "type": v_type,
                "identifier": identifier,
                "status": status,
                "details": details
            })
        except Exception as e:
            logger.error(f"MongoDB verification log error: {e}")

mongo_manager = MongoDBManager()
