import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.database.database import SessionLocal, init_db
from app.models.models import User, Standard, StandardClause, Product, QCO, VerificationRecord
from app.database.mongodb import mongo_manager
from app.config import settings

def sync_to_mongodb(mongo_uri: str):
    print("==========================================================")
    print(" BISmart AI – MongoDB Atlas Cloud Database Synchronization")
    print("==========================================================")

    if "<db_password>" in mongo_uri:
        print("❌ Error: The connection URI still contains the placeholder '<db_password>'.")
        print("Please replace '<db_password>' with your actual MongoDB Atlas user password.")
        return False

    print("Connecting to MongoDB Atlas Cluster...")
    connected = mongo_manager.connect(mongo_uri)
    if not connected:
        print("❌ Failed to connect to MongoDB Atlas.")
        print("Common checks:")
        print("  1. Ensure your IP address is whitelisted in MongoDB Atlas (Network Access -> Add 0.0.0.0/0).")
        print("  2. Verify username and password in Database Access.")
        return False

    db = SessionLocal()
    try:
        # Sync Users
        users = db.query(User).all()
        user_records = [
            {"id": u.id, "email": u.email, "full_name": u.full_name, "role": u.role, "organization": u.organization}
            for u in users
        ]
        mongo_manager.sync_records_to_mongo("users", user_records)
        print(f"✓ Synced {len(user_records)} users to MongoDB 'users' collection")

        # Sync Standards
        standards = db.query(Standard).all()
        std_records = [
            {
                "id": s.id,
                "is_number": s.is_number,
                "title": s.title,
                "year": s.year,
                "category": s.category,
                "scope": s.scope,
                "mandatory_status": s.mandatory_status,
                "qco_reference": s.qco_reference,
                "source_url": s.source_url
            }
            for s in standards
        ]
        mongo_manager.sync_records_to_mongo("standards", std_records)
        print(f"✓ Synced {len(std_records)} standards to MongoDB 'standards' collection")

        # Sync Clauses
        clauses = db.query(StandardClause).all()
        clause_records = [
            {
                "id": c.id,
                "standard_id": c.standard_id,
                "clause_number": c.clause_number,
                "title": c.title,
                "content": c.content,
                "page_number": c.page_number,
                "is_mandatory": c.is_mandatory
            }
            for c in clauses
        ]
        mongo_manager.sync_records_to_mongo("clauses", clause_records)
        print(f"✓ Synced {len(clause_records)} clauses to MongoDB 'clauses' collection")

        # Sync Products
        products = db.query(Product).all()
        prod_records = [
            {
                "id": p.id,
                "name": p.name,
                "category": p.category,
                "material": p.material,
                "capacity": p.capacity,
                "qco_order_name": p.qco_order_name,
                "mandatory_certification": p.mandatory_certification
            }
            for p in products
        ]
        mongo_manager.sync_records_to_mongo("products", prod_records)
        print(f"✓ Synced {len(prod_records)} products to MongoDB 'products' collection")

        # Sync QCOs
        qcos = db.query(QCO).all()
        qco_records = [
            {
                "id": q.id,
                "order_name": q.order_name,
                "ministry": q.ministry,
                "is_numbers": q.is_numbers,
                "products_covered": q.products_covered,
                "summary": q.summary
            }
            for q in qcos
        ]
        mongo_manager.sync_records_to_mongo("qcos", qco_records)
        print(f"✓ Synced {len(qco_records)} QCO orders to MongoDB 'qcos' collection")

        print("\n🎉 SUCCESS! MongoDB Atlas database 'BISSystem' is fully populated and synchronized.")
        return True
    finally:
        db.close()

if __name__ == "__main__":
    uri = sys.argv[1] if len(sys.argv) > 1 else (os.getenv("MONGODB_URI") or settings.MONGODB_URI)
    if not uri:
        # Load from .env file directly
        from dotenv import load_dotenv
        load_dotenv()
        uri = os.getenv("MONGODB_URI")

    if not uri:
        print("Usage: python sync_mongodb.py 'mongodb+srv://<user>:<password>@cluster.mongodb.net/BISSystem'")
        sys.exit(1)
    sync_to_mongodb(uri)
