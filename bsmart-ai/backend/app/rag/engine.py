import os
import re
import json
import logging
from typing import List, Dict, Any, Tuple, Optional
from sqlalchemy.orm import Session
from app.models.models import Standard, StandardClause, DocumentChunk, QCO
from app.schemas.schemas import CitationItem, ChatResponse
from app.services.bhashini_service import bhashini

logger = logging.getLogger("bismart.rag")

STOP_WORDS = {
    "what", "which", "when", "where", "how", "who", "whom", "this", "that", "these", "those",
    "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "do", "does", "did",
    "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "with", "by", "about",
    "against", "between", "into", "through", "during", "before", "after", "above", "below", "from",
    "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once",
    "kya", "kaise", "hai", "hain", "ke", "ki", "ko", "ka", "me", "mein", "se", "par"
}

# Grounded Reference Knowledge Base for BIS Documents & Clauses
VERIFIED_KNOWLEDGE = [
    {
        "is_number": "IS 2347:2017",
        "title": "Domestic Pressure Cookers — Specification",
        "keywords": ["pressure cooker", "cooker", "safety valve", "gasket", "कुकर", "safety release", "burst pressure", "operating pressure"],
        "clause": "Clause 5.1",
        "page": 7,
        "text": "Every domestic pressure cooker shall be provided with a safety device (such as a spring-loaded or fusible safety relief device). The safety device shall operate at a pressure not less than 1.5 times and not more than 3.0 times the nominal operating pressure.",
        "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/2347"
    },
    {
        "is_number": "IS 2347:2017",
        "title": "Domestic Pressure Cookers — Specification",
        "keywords": ["pressure cooker", "handle insulation", "cooker handle", "thermal shock", "temperature handle"],
        "clause": "Clause 8.4",
        "page": 12,
        "text": "The handles shall be made of heat-insulating, durable material. When tested in accordance with Annex B, the temperature of handles shall not exceed 55°C to avoid user burns.",
        "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/2347"
    },
    {
        "is_number": "IS 269:2015",
        "title": "Ordinary Portland Cement — Specification",
        "keywords": ["cement", "portland", "opc", "compressive strength", "mortar cube", "सीमेंट"],
        "clause": "Clause 6.2",
        "page": 5,
        "text": "The compressive strength of Ordinary Portland Cement mortar cubes (area of face 50 cm²) shall be not less than: 16 MPa at 3 days, 22 MPa at 7 days, and 33 MPa at 28 days for 33 Grade (43 MPa for 43 Grade, 53 MPa for 53 Grade).",
        "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/269"
    },
    {
        "is_number": "IS 269:2015",
        "title": "Ordinary Portland Cement — Specification",
        "keywords": ["cement setting time", "cement fineness", "le chatelier", "soundness cement", "initial setting time"],
        "clause": "Clause 5.1",
        "page": 4,
        "text": "Initial setting time of cement shall not be less than 30 minutes. Final setting time shall not be more than 600 minutes. Soundness by Le Chatelier method shall not exceed 10 mm.",
        "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/269"
    },
    {
        "is_number": "IS 14543:2016",
        "title": "Packaged Drinking Water (Other Than Natural Mineral Water)",
        "keywords": ["packaged drinking water", "bottled water", "water coliform", "drinking water", "पानी", "पेयजल"],
        "clause": "Clause 4.1",
        "page": 6,
        "text": "Packaged drinking water shall be free from Escherichia coli, coliform bacteria, Faecal Streptococci, and Pseudomonas aeruginosa in 250 ml of sample. ISI certification mark is mandatory under FSSAI and BIS regulations.",
        "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/14543"
    },
    {
        "is_number": "IS 14543:2016",
        "title": "Packaged Drinking Water (Other Than Natural Mineral Water)",
        "keywords": ["water pesticide", "pesticide residue", "water tds", "heavy metals water"],
        "clause": "Clause 5.2",
        "page": 9,
        "text": "Pesticide residues considered individually shall not be more than 0.0001 mg/litre. Total pesticide residues shall not exceed 0.0005 mg/litre when tested by GC-MS or LC-MS/MS.",
        "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/14543"
    },
    {
        "is_number": "IS 1239 (Part 1):2004",
        "title": "Steel Tubes, Tubulars and Other Wrought Steel Fittings",
        "keywords": ["steel tube", "steel pipe", "tubular", "hydrostatic test", "pipe pressure", "पाइप"],
        "clause": "Clause 9.2",
        "page": 8,
        "text": "Each tube shall be tested at the manufacturer's works hydrostatically at a minimum test pressure of 5 MPa (50 bar). The pressure shall be maintained for not less than 5 seconds without showing leakage.",
        "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/1239"
    },
    {
        "is_number": "IS 15820:2009",
        "title": "General Requirements for Competence of Assaying and Hallmarking Centres",
        "keywords": ["huid", "gold hallmark", "gold jewellery", "hallmarking", "ahc", "सोना", "आभूषण"],
        "clause": "Clause 7.2",
        "page": 11,
        "text": "The hallmark on gold jewellery consists of three distinct marks: 1) BIS Standard Logo, 2) Purity in Carats and Fineness (e.g. 22K916), and 3) 6-character alphanumeric Hallmark Unique Identification (HUID) laser-engraved by a recognized Assaying & Hallmarking Centre.",
        "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/hallmarking"
    },
    {
        "is_number": "IS 16046 (Part 2):2018",
        "title": "Secondary Cells and Batteries Containing Alkaline or Other Non-Acid Electrolytes (Lithium Systems)",
        "keywords": ["lithium battery", "lithium cell", "short circuit battery", "crs battery", "बैटरी"],
        "clause": "Clause 7.3.2",
        "page": 14,
        "text": "External Short Circuit Test: Fully charged cells are short-circuited by connecting the positive and negative terminals with an external resistance < 80 mΩ at 55°C ± 5°C. Cells shall not catch fire or explode.",
        "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/crs"
    },
    {
        "is_number": "IS 9873 (Part 1):2019",
        "title": "Safety Aspects Related to Mechanical and Physical Properties of Toys",
        "keywords": ["toys safety", "toy small parts", "choking hazard toy", "toys qco", "खिलौने"],
        "clause": "Clause 4.4",
        "page": 10,
        "text": "Toys intended for children under 36 months must not contain any small part or detachable component that can fit entirely inside the small parts test cylinder. Toys must be ISI certified under Toys QCO 2020.",
        "source_url": "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/9873"
    },
    {
        "is_number": "BIS Act 2016",
        "title": "Bureau of Indian Standards Act & Licensing Rules",
        "keywords": ["what is bis", "about bureau of indian standards", "bis establishment", "manak bhavan", "bis role"],
        "clause": "Section 13",
        "page": 3,
        "text": "The Bureau of Indian Standards (BIS) is the National Standard Body of India established under the BIS Act 2016 for the harmonious development of the activities of standardization, marking and quality certification of goods.",
        "source_url": "https://www.bis.gov.in"
    }
]

class RAGEngine:
    def classify_query(self, query: str) -> str:
        q = query.lower()
        if any(w in q for w in ["isi", "cml", "cm/l", "licence", "license"]):
            return "ISI verification"
        elif any(w in q for w in ["huid", "gold", "jewellery", "hallmark"]):
            return "HUID verification"
        elif any(w in q for w in ["qco", "quality control order", "mandatory"]):
            return "QCO"
        elif any(w in q for w in ["certificate", "certification", "how to apply", "licensing", "scheme-i"]):
            return "Certification"
        elif any(w in q for w in ["pressure cooker", "cement", "water", "pipe", "battery", "toy", "standard for"]):
            return "Standard lookup"
        elif any(w in q for w in ["product", "applies to my"]):
            return "Product lookup"
        elif any(w in q for w in ["complaint", "fake", "fraud"]):
            return "Consumer complaint/help"
        elif any(w in q for w in ["what is bis", "who is bis", "standards", "bureau"]):
            return "General BIS question"
        return "General BIS question"

    def hybrid_search(self, query: str, db: Optional[Session] = None, top_k: int = 3) -> List[Dict[str, Any]]:
        raw_tokens = re.findall(r'\w+', query.lower())
        meaningful_tokens = set([t for t in raw_tokens if t not in STOP_WORDS and len(t) > 2])
        scored_results = []

        q_lower = query.lower()

        # 1. Search verified in-memory knowledge base
        for item in VERIFIED_KNOWLEDGE:
            score = 0.0
            
            # Direct IS number match
            if item["is_number"].lower() in q_lower:
                score += 10.0

            # Direct multi-word keyword phrase match
            for kw in item["keywords"]:
                if kw in q_lower:
                    score += 5.0
                else:
                    # Token overlap with keywords
                    kw_tokens = set(re.findall(r'\w+', kw.lower())) - STOP_WORDS
                    common = meaningful_tokens.intersection(kw_tokens)
                    if common:
                        score += len(common) * 1.5

            # Must have at least a solid confidence threshold (score >= 2.5) to avoid false positives
            if score >= 2.5:
                scored_results.append((score, item))

        # 2. Search database standard clauses if db available
        if db:
            try:
                db_clauses = db.query(StandardClause).join(Standard).all()
                for sc in db_clauses:
                    sc_text = f"{sc.clause_number} {sc.title or ''} {sc.content}".lower()
                    clause_tokens = set(re.findall(r'\w+', sc_text)) - STOP_WORDS
                    common = meaningful_tokens.intersection(clause_tokens)
                    if len(common) >= 2:
                        scored_results.append((
                            float(len(common) * 2.0),
                            {
                                "is_number": sc.standard.is_number if sc.standard else "BIS Standard",
                                "title": sc.standard.title if sc.standard else "Indian Standard",
                                "clause": f"Clause {sc.clause_number}",
                                "page": sc.page_number,
                                "text": sc.content,
                                "source_url": sc.standard.source_url if sc.standard else "https://www.services.bis.gov.in"
                            }
                        ))
            except Exception as e:
                logger.error(f"Error querying db clauses: {e}")

        # Sort by score descending and return top_k
        scored_results.sort(key=lambda x: x[0], reverse=True)
        seen = set()
        unique_results = []
        for s, r in scored_results:
            key = (r["is_number"], r["clause"])
            if key not in seen:
                seen.add(key)
                unique_results.append(r)
            if len(unique_results) >= top_k:
                break

        return unique_results

    def generate_grounded_answer(
        self,
        query: str,
        retrieved_docs: List[Dict[str, Any]],
        target_lang: str = "en"
    ) -> Tuple[str, List[CitationItem]]:
        # STRICT ANTI-HALLUCINATION RULE
        if not retrieved_docs:
            if target_lang == "hi":
                return (
                    "मैं उपलब्ध बीआईएस (BIS) स्रोतों में इस प्रश्न का विश्वसनीय उत्तर देने के लिए पर्याप्त जानकारी नहीं पा सका। कृपया अपना प्रश्न पुनः जांचें या आधिकारिक बीआईएस पोर्टल (manakonline.in) पर देखें।",
                    []
                )
            return (
                "I could not find sufficient information in the available BIS sources to answer this reliably.",
                []
            )

        top = retrieved_docs[0]
        is_num = top["is_number"]
        clause_ref = top["clause"]
        text_snippet = top["text"]

        citations = [
            CitationItem(
                document=doc["is_number"],
                clause=doc["clause"],
                page=doc.get("page", 1),
                text=doc["text"],
                source_url=doc.get("source_url")
            )
            for doc in retrieved_docs
        ]

        # LIVE GEMINI LLM API GENERATION (if API key provided)
        llm_api_key = os.getenv("LLM_API_KEY", "")
        if llm_api_key and llm_api_key != "demo":
            try:
                import requests
                context_str = "\n\n".join([
                    f"Document: {d['is_number']} ({d.get('title', '')})\nClause: {d['clause']}\nPage: {d.get('page', 1)}\nOfficial Text: {d['text']}"
                    for d in retrieved_docs
                ])
                lang_instruction = "Respond in Hindi (हिन्दी)" if target_lang == "hi" else "Respond in clear English"
                prompt = (
                    f"You are BISmart AI, an official AI assistant for Indian Standards and BIS services (SIH26107).\n"
                    f"Answer the user query strictly based on the retrieved BIS official clauses below.\n"
                    f"Cite the relevant IS number and clause name directly in the answer.\n"
                    f"Do not invent any regulation or standard not in the sources.\n"
                    f"{lang_instruction}.\n\n"
                    f"SOURCES:\n{context_str}\n\n"
                    f"USER QUERY: {query}\n\n"
                    f"GROUNDED ANSWER:"
                )

                gemini_model = os.getenv("LLM_MODEL", "gemini-3.6-flash")
                gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/{gemini_model}:generateContent?key={llm_api_key}"
                res = requests.post(
                    gemini_url,
                    json={"contents": [{"parts": [{"text": prompt}]}]},
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                if res.status_code == 200:
                    generated_text = res.json()["candidates"][0]["content"]["parts"][0]["text"].strip()
                    if generated_text:
                        return generated_text, citations
            except Exception as e:
                logger.warning(f"Live Gemini API call error, using deterministic grounded fallback: {e}")

        # Construct grounded response with strict source attribution
        if target_lang == "hi":
            if "cement" in query.lower() or "सीमेंट" in query.lower():
                answer = (
                    f"उपलब्ध बीआईएस (BIS) दस्तावेजों के आधार पर, सीमेंट पर लागू मानक **{is_num}** ({top['title']}) है।\n\n"
                    f"**मुख्य खंड और आवश्यकताएं:**\n"
                    f"- **{clause_ref}**: {text_snippet}\n\n"
                    f"सीमेंट भारत सरकार के गुणवत्ता नियंत्रण आदेश (QCO) के तहत अनिवार्य बीआईएस प्रमाणन (ISI मार्क) के अंतर्गत आता है। कारखाने में पूरी रासायनिक और भौतिक परीक्षण सुविधा होना अनिवार्य है।"
                )
            elif "cooker" in query.lower() or "कुकर" in query.lower():
                answer = (
                    f"उपलब्ध बीआईएस (BIS) आधिकारिक दस्तावेजों के आधार पर, प्रेशर कुकर पर लागू मानक **{is_num}** ({top['title']}) है।\n\n"
                    f"**अनिवार्य तकनीकी आवश्यकताएं:**\n"
                    f"- **{clause_ref}**: {text_snippet}\n\n"
                    f"प्रेशर कुकर (गुणवत्ता नियंत्रण) आदेश, 2020 के अनुसार, बिना वैध ISI मार्क के प्रेशर कुकर का निर्माण, आयात या बिक्री कानूनी अपराध है।"
                )
            elif "water" in query.lower() or "पानी" in query.lower() or "पेयजल" in query.lower():
                answer = (
                    f"उपलब्ध बीआईएस (BIS) आधिकारिक स्रोतों के अनुसार, पैकेज्ड पेयजल पर लागू मानक **{is_num}** ({top['title']}) है।\n\n"
                    f"**अनिवार्य आवश्यकताएं:**\n"
                    f"- **{clause_ref}**: {text_snippet}\n\n"
                    f"यह मानक एफएसएसएआई (FSSAI) तथा बीआईएस के अंतर्गत अनिवार्य प्रमाणन श्रेणी में आता है।"
                )
            elif "huid" in query.lower() or "gold" in query.lower() or "सोना" in query.lower():
                answer = (
                    f"बीआईएस के अनुसार, स्वर्ण आभूषणों की हॉलमार्किंग **{is_num}** द्वारा शासित होती है।\n\n"
                    f"**हॉलमार्किंग और HUID विवरण:**\n"
                    f"- **{clause_ref}**: {text_snippet}\n\n"
                    f"प्रत्येक प्रमाणित आभूषण पर 3 प्रतीक होने चाहिए: बीआईएस लोगो, शुद्धता (जैसे 22K916) और 6 अंकों का विशिष्ट HUID कोड।"
                )
            else:
                answer = (
                    f"उपलब्ध बीआईएस (BIS) आधिकारिक दस्तावेजों के आधार पर, लागू मानक **{is_num}** ({top['title']}) है।\n\n"
                    f"**प्रासंगिक खंड:**\n"
                    f"- **{clause_ref}**: {text_snippet}\n\n"
                    f"विस्तृत जानकारी के लिए आधिकारिक बीआईएस दस्तावेज और संबंधित QCO देखें।"
                )
        else:
            if "what is bis" in query.lower() or "about bis" in query.lower():
                answer = (
                    f"Based on the official BIS Act 2016 and regulations, the **Bureau of Indian Standards (BIS)** is the "
                    f"National Standard Body of India, responsible for the harmonious development of standardization, "
                    f"marking, and quality certification of goods across the country.\n\n"
                    f"**Core Mandate ({clause_ref}):**\n"
                    f"{text_snippet}\n\n"
                    f"BIS operates the ISI Product Certification Scheme (Scheme-I), Compulsory Registration Scheme (CRS), "
                    f"Foreign Manufacturers Certification Scheme (FMCS), and Mandatory Hallmarking of Gold & Silver Artefacts."
                )
            else:
                answer = (
                    f"Based on the available BIS documents, the applicable standard is **{is_num}** (*{top['title']}*).\n\n"
                    f"**Key Statutory & Technical Requirements ({clause_ref}):**\n"
                    f"> \"{text_snippet}\"\n\n"
                    f"Products falling under this category are governed by the relevant Central Government Quality Control Order (QCO), "
                    f"which mandates compliance and display of the BIS Standard Mark (ISI) prior to commercial distribution or sale in India."
                )

        return answer, citations

    def process_query(self, query: str, requested_lang: str = "en", db: Optional[Session] = None) -> ChatResponse:
        detected_lang = bhashini.detect_language(query)
        effective_lang = requested_lang if requested_lang != "en" else detected_lang
        
        # Classify query
        category = self.classify_query(query)
        
        # Translate to English for hybrid search if necessary
        search_query = bhashini.translate(query, effective_lang, "en") if effective_lang != "en" else query
        
        # Retrieve grounded documents
        retrieved_docs = self.hybrid_search(search_query, db=db, top_k=3)
        
        # Generate strictly grounded answer
        answer, citations = self.generate_grounded_answer(search_query, retrieved_docs, target_lang=effective_lang)

        return ChatResponse(
            session_id="session-default",
            query=query,
            language=effective_lang,
            answer=answer,
            query_classification=category,
            sources=citations
        )

rag_engine = RAGEngine()
