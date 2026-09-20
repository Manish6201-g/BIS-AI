import pytest
from app.rag.engine import rag_engine

def test_sih_sample_questions():
    # 1. "What is BIS?"
    resp_bis = rag_engine.process_query("What is BIS?")
    assert "Bureau of Indian Standards" in resp_bis.answer
    assert "BIS Act 2016" in resp_bis.sources[0].document

    # 2. "Which Indian Standard applies to my product?" -> Pressure cooker
    resp_cooker = rag_engine.process_query("Which Indian Standard applies to pressure cooker?")
    assert "IS 2347:2017" in resp_cooker.answer
    assert any("Clause 5.1" in s.clause for s in resp_cooker.sources)

    # 3. "How can I verify an ISI mark?"
    resp_isi = rag_engine.process_query("How can I verify an ISI mark and CM/L licence?")
    assert resp_isi.query_classification == "ISI verification"

    # 4. "What is HUID?"
    resp_huid = rag_engine.process_query("What is HUID for gold jewellery hallmarking?")
    assert "HUID" in resp_huid.answer
    assert "IS 15820:2009" in resp_huid.sources[0].document

    # 5. Hindi query: "प्रेशर कुकर पर कौन सा मानक लागू होता है?"
    resp_hi = rag_engine.process_query("प्रेशर कुकर पर कौन सा मानक लागू होता है?", requested_lang="hi")
    assert resp_hi.language == "hi"
    assert "IS 2347:2017" in resp_hi.answer
    assert "लागू मानक" in resp_hi.answer or "आधिकारिक" in resp_hi.answer
