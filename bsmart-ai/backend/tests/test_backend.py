import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database.database import SessionLocal
from app.services.verification_service import verification_service
from app.services.product_matcher_service import product_matcher
from app.rag.engine import rag_engine

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"

def test_auth_login_demo():
    response = client.post(
        "/api/auth/login",
        json={"email": "consumer@bismart.gov.in", "password": "Demo1234!"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["role"] == "consumer"

def test_isi_verification_valid():
    db = SessionLocal()
    try:
        # Test valid CM/L
        result = verification_service.verify_isi("8400123", db)
        assert result["status"] == "VERIFIED"
        assert result["is_valid"] is True
        assert "Hawkins" in result["manufacturer_name"]
        assert result["is_standard"] == "IS 2347:2017"

        # Test invalid CM/L
        invalid_res = verification_service.verify_isi("123", db)
        assert invalid_res["status"] == "INVALID_MISMATCH"
        assert invalid_res["is_valid"] is False
    finally:
        db.close()

def test_huid_verification_valid():
    db = SessionLocal()
    try:
        # Test valid 6-char HUID
        result = verification_service.verify_huid("AA1234", db)
        assert result["status"] == "VERIFIED"
        assert result["is_valid"] is True
        assert "22K 916" in result["purity_fineness"]

        # Test invalid HUID format
        bad_format = verification_service.verify_huid("123", db)
        assert bad_format["status"] == "INVALID_FORMAT"
        assert bad_format["is_valid"] is False
    finally:
        db.close()

def test_product_to_standard_matcher():
    res = product_matcher.match_product(product_name="Pressure Cooker")
    assert res.matched_standard is not None
    assert res.matched_standard.is_number == "IS 2347:2017"
    assert res.mandatory_certification is True
    assert len(res.relevant_clauses) > 0
    assert any("Clause 5.1" in c.clause_number for c in res.relevant_clauses)

def test_rag_anti_hallucination():
    # Query completely outside of BIS domain
    nonsense_query = "What is the interplanetary warp drive regulation for spacecraft?"
    resp = rag_engine.process_query(nonsense_query)
    assert "I could not find sufficient information in the available BIS sources to answer this reliably." in resp.answer
    assert len(resp.sources) == 0

def test_rag_grounded_answer_with_citations():
    # Query about pressure cooker safety
    query = "What is the safety valve requirement for pressure cookers?"
    resp = rag_engine.process_query(query)
    assert "IS 2347:2017" in resp.answer
    assert len(resp.sources) > 0
    assert resp.sources[0].clause == "Clause 5.1"
    assert resp.sources[0].document == "IS 2347:2017"

def test_standards_api():
    response = client.get("/api/standards")
    assert response.status_code == 200
    stds = response.json()
    assert len(stds) >= 7
    is_numbers = [s["is_number"] for s in stds]
    assert "IS 2347:2017" in is_numbers
    assert "IS 269:2015" in is_numbers
