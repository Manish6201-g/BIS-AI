# BISmart AI – AI-Powered Intelligent Assistant for Indian Standards and BIS Services

[![Smart India Hackathon 2026](https://img.shields.io/badge/SIH-2026-orange.svg)](https://sih.gov.in)
[![Problem Statement](https://img.shields.io/badge/Problem%20ID-SIH26107-blue.svg)](https://sih.gov.in)
[![Category](https://img.shields.io/badge/Category-Software-green.svg)](https://sih.gov.in)
[![Theme](https://img.shields.io/badge/Theme-Smart%20Automation-red.svg)](https://sih.gov.in)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-teal.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite%20%2B%20Tailwind-blue.svg)](https://react.dev)

> **BISmart AI** is a production-grade, full-stack intelligent assistance platform built for **Smart India Hackathon 2026 Problem Statement SIH26107**. It empowers Indian manufacturers, MSMEs, regulatory officers, and 1.4 billion citizens to effortlessly understand Indian Standards (IS), Bureau of Indian Standards (BIS) certification procedures, Quality Control Orders (QCOs), and verify product authenticity.

---

## Key Differentiators & Core Features

1. **Multilingual Voice & Text Assistance (Digital India / Bhashini Architecture)**
   - Native voice & text interaction in **11 Indian languages**: English, Hindi (हिन्दी), Punjabi (ਪੰਜਾਬੀ), Bengali (বাংলা), Tamil (தமிழ்), Telugu (తెలుగు), Marathi (मराठी), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), and Odia (ଓଡ଼ିଆ).
   - Real-time speech recognition and text-to-speech synthesis for rural and accessibility-first citizens.

2. **Clause-Level Citation Engine (Strict Anti-Hallucination Guarantee)**
   - Every factual answer is linked to verified gazetted Indian Standards.
   - Interactive citation badges `[1] IS 2347:2017 — Clause 5.1` open a slide-over **Clause Inspection Drawer** showing verbatim statutory text, page numbers, and official BIS portal references.
   - **Zero Hallucination Rule**: If a query is not supported by verified BIS knowledge base records, the assistant explicitly reports:
     > *"I could not find sufficient information in the available BIS sources to answer this reliably."*

3. **Product-to-Standard Matcher**
   - Resolves industrial products (e.g., Pressure Cookers, Cement, Packaged Drinking Water, Steel Pipes, Toys, Batteries) to their mandatory IS specifications.
   - Highlights statutory Quality Control Orders (QCOs), enforcement dates, critical safety testing parameters, and compliance roadmaps.

4. **10-Step BIS Certification Workflow Wizard**
   - Step-by-step interactive navigator for manufacturers seeking BIS Scheme-I (ISI Mark) licence.
   - Tracks Form-V filing, factory layout plans, in-house lab apparatus, Scheme of Inspection & Testing (SIT), and generates an audit-ready compliance summary report.

5. **ISI Mark CM/L Authenticity Verifier**
   - Instant validation of the 7-digit Certification Marks Licence (CM/L) number displayed beneath the ISI logo.
   - Cross-checks manufacturer name, factory address, standard code, and validity status (Operative vs. Expired vs. Mismatch).

6. **HUID Gold Jewellery Hallmarking Checker**
   - Validates 6-character laser-engraved Hallmark Unique Identification (HUID) codes.
   - Verifies gold purity (22K 916, 18K 750, 14K 585), Assaying & Hallmarking Centre (AHC) accreditation, and date of hallmarking.
   - Includes simulated QR/camera scanning for mobile consumer convenience.

7. **Citizen, Industry & Admin Dashboards**
   - Telemetry analytics showing query classification, language distributions, most searched standards, and verification success rates.
   - Admin portal for document ingestion (PDF, DOCX, TXT) with automatic clause chunking.

---

## System Architecture

```
User Query (Voice / Text)
       │
       ▼
Language Detection & Bhashini Translation (11 Indian Languages)
       │
       ▼
Query Classification (Standards, Product, QCO, ISI, HUID, General)
       │
       ▼
Hybrid Search (BM25 Keyword + In-Memory/Vector Cosine Retrieval)
       │
       ▼
Reranking & Grounded Clause Retrieval
       │
       ▼
Anti-Hallucination LLM Generator (Strict Grounding Prompt)
       │
       ▼
Response with Verifiable Clause Citations + Bhashini TTS Audio
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide React, React Router 6, Axios |
| **Backend** | Python 3.9+, FastAPI, Pydantic v2, SQLAlchemy 2.0 |
| **Authentication** | JWT (JSON Web Tokens), PBKDF2/Bcrypt password hashing, Role-Based Access Control |
| **AI / RAG** | Hybrid Search (Keyword BM25 + Vector Cosine), Multi-source Reciprocal Fusion, Strict Grounding |
| **Database** | Dual-Mode: Local SQLite out-of-the-box + PostgreSQL with `pgvector` for production |
| **Speech** | Web Speech API + Bhashini Digital India Architecture |
| **Containers** | Docker, Docker Compose |

---

## Project Structure

```
bsmart-ai/
├── backend/
│   ├── app/
│   │   ├── api/             # REST endpoints (auth, chat, standards, matcher, cert, verify, admin)
│   │   ├── auth/            # JWT authentication & role-based dependencies
│   │   ├── config.py        # Environment variables & settings
│   │   ├── database/        # Dual-mode SQLite/PostgreSQL connection engine
│   │   ├── ingestion/       # Intelligent document & clause chunking parser
│   │   ├── models/          # SQLAlchemy data models
│   │   ├── rag/             # Hybrid search, query classifier, anti-hallucination engine
│   │   ├── schemas/         # Pydantic validation schemas
│   │   ├── services/        # Product matcher, verification, certification, Bhashini services
│   │   └── main.py          # FastAPI application entrypoint
│   ├── data/documents/      # Knowledge repository documents
│   ├── scripts/             # Initial seed script with authentic Indian Standards & QCOs
│   ├── tests/               # Automated pytest suite (anti-hallucination, verification, API tests)
│   ├── pytest.ini           # Pytest configuration
│   └── requirements.txt     # Python backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, Footer, ClauseDrawer, VoiceModal
│   │   ├── context/         # AuthContext (roles), LanguageContext (11 languages)
│   │   ├── pages/           # Landing, Assistant, Matcher, Wizard, Verify ISI, Verify HUID, Standards, Dashboard, Admin, Auth
│   │   ├── services/        # Axios API client
│   │   ├── App.jsx          # Route definitions
│   │   └── main.jsx         # React DOM mount
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── docker-compose.yml       # Production container orchestration
├── Dockerfile.backend
├── Dockerfile.frontend
├── .env.example
├── start.sh                 # Single-command startup automation script
└── README.md
```

---

## Quick Start (Run in 2 Minutes)

### Option 1: Automatic Single Command (Recommended)

From the project root directory:

```bash
chmod +x bsmart-ai/start.sh
./bsmart-ai/start.sh
```

This will automatically:
1. Seed the initial BIS standards, clauses, QCOs, and demo verification records into the database.
2. Run the 9-test automated test suite (verifying anti-hallucination guardrails and verification logic).
3. Start the FastAPI backend at `http://127.0.0.1:8000` (Interactive Docs: `http://127.0.0.1:8000/docs`).
4. Start the React Vite frontend at `http://localhost:5173`.

---

### Option 2: Manual Step-by-Step

#### 1. Backend Setup

```bash
cd bsmart-ai/backend

# Create virtual environment (Python 3.9+)
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt email-validator

# Seed the database
python scripts/seed_data.py

# Run the automated test suite
PYTHONPATH="." pytest tests/ -v

# Start the FastAPI server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

Backend API Swagger Documentation is available at:
👉 **`http://127.0.0.1:8000/docs`**

#### 2. Frontend Setup

```bash
cd bsmart-ai/frontend

# Install npm dependencies
npm install

# Start development server
npm run dev
```

Frontend application will be live at:
👉 **`http://localhost:5173`**

---

## Default Demo User Accounts

| Role | Email | Password | Intended Persona |
|---|---|---|---|
| **Consumer** | `consumer@bismart.gov.in` | `Demo1234!` | Indian Citizen / Buyer |
| **Industry** | `industry@bismart.gov.in` | `Demo1234!` | Manufacturer / MSME |
| **Admin** | `admin@bismart.gov.in` | `Admin1234!` | BIS Scientist / Officer |

*(Note: The navigation bar includes a one-click demo role switcher to test all 3 personas instantly without typing.)*

---

## Curated Demo Test Records

### 1. ISI Mark CM/L Licence Numbers
- **`8400123`** → **VERIFIED**: Hawkins Cookers Ltd (`IS 2347:2017`, Active)
- **`7123456`** → **VERIFIED**: UltraTech Cement Ltd (`IS 269:2015`, Active)
- **`9554321`** → **VERIFIED**: Tata Steel Tubes Division (`IS 1239:2004`, Active)
- **`6001122`** → **VERIFIED**: Bisleri Packaged Water (`IS 14543:2016`, Active)
- **`5009988`** → **INVALID_MISMATCH**: Expired Licence Warning (Safety Offence)

### 2. HUID Gold Hallmarking Codes
- **`AA1234`** → **VERIFIED**: 22K 916 Gold Bangle (National Assaying Centre, Mumbai)
- **`B7K89M`** → **VERIFIED**: 18K 750 Handcrafted Gold Necklace (Chennai AHC)
- **`X9Y1Z2`** → **VERIFIED**: 24K 999 Pure Gold Coin (Delhi Assay Lab)
- **`ZZ9999`** → **UNVERIFIED**: Record not in hallmarking registry

---

## SIH Jury Presentation & Demo Flow

Follow this journey during the evaluation:

1. **Homepage Introduction**: Show the Gov-Tech aesthetic, live telemetry stats, and end-to-end journey steps (QUESTION → STANDARD → CLAUSE → CERTIFY → VERIFY).
2. **Multilingual Voice Query**:
   - Switch language to **हिन्दी (Hindi)** in the top bar.
   - Open **AI Assistant** (`/assistant`).
   - Click the mic icon or select the preset: *"प्रेशर कुकर पर कौन सा बीआईएस मानक लागू होता है?"*.
   - Observe the grounded Hindi response with exact clause citation `[1] IS 2347:2017 — Clause 5.1`.
   - Click the citation button to open the slide-over **Clause Inspection Drawer** and show verbatim standard text.
3. **Anti-Hallucination Verification**:
   - Ask a nonsensical or fabricated standard question: *"What is the warp drive engine regulation?"*.
   - Observe that the assistant refuses to invent fake IS numbers and returns the strict safeguard message.
4. **Product-to-Standard Matcher** (`/matcher`):
   - Enter *"Pressure Cooker"* (Aluminium, 5 Litres).
   - Review the matched standard (`IS 2347:2017`), mandatory QCO notification reference, testing clauses, and retrieval confidence score.
5. **BIS Certification Wizard** (`/certification`):
   - Walk through the 10 steps (Product → Standard → Mandatory Scope → QCO → Factory details → Form-V Documents → Lab Testing Equipment → Application Guidance → Pre-Audit Checklist → Compliance Summary).
   - Click **Print / Download PDF** to generate the final audit summary report.
6. **Product Authenticity Verification**:
   - Navigate to **Verify ISI Mark** (`/verify-isi`): test valid CM/L `8400123` vs expired `5009988`.
   - Navigate to **Verify HUID** (`/verify-huid`): test 6-character HUID `AA1234` and trigger the simulated QR scanner.
7. **Standards Explorer & Admin Portal**:
   - Browse the searchable directory of standards (`/standards`).
   - Switch role to **Admin** and view the document ingestion & chunking portal (`/admin`).

---

## Production Cloud Deployment Guide

### Frontend → Vercel
1. Set Root Directory to `bsmart-ai/frontend`.
2. Framework Preset: `Vite`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Add rewrite in `vercel.json`:
   ```json
   {
     "rewrites": [
       { "source": "/api/(.*)", "destination": "https://your-backend-api.onrender.com/api/$1" },
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

### Backend → Render / Railway
1. Set Root Directory to `bsmart-ai/backend`.
2. Build Command: `pip install -r requirements.txt email-validator`.
3. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
4. Add environment variables: `DATABASE_URL`, `JWT_SECRET`, `APP_ENV=production`.

### Database → PostgreSQL + pgvector
1. Provision a PostgreSQL instance on Supabase, Neon, or Railway.
2. Enable pgvector: `CREATE EXTENSION IF NOT EXISTS vector;`.
3. Set `DATABASE_URL=postgresql://user:pass@host:5432/dbname`.

---

## License & SIH Compliance
Developed for **Smart India Hackathon 2026** under Problem Statement **SIH26107**. Free and open-source under the MIT License for public-interest national safety and standardization.
