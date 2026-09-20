# BISmart AI — Production Deployment Guide
**Smart India Hackathon 2026 Problem Statement SIH26107**

This guide provides end-to-end instructions for deploying **BISmart AI** across various hosting environments:
- **Option A:** Docker & Docker Compose (Single VPS, AWS EC2, DigitalOcean, Azure VM)
- **Option B:** Cloud Platform-as-a-Service (Vercel + Render / Railway + Supabase / Neon)
- **Option C:** Kubernetes / Cloud Native

---

## 1. Environment Variables Configuration

Create your production `.env` file based on `.env.example`:

```bash
# ----------------------------------------------------
# APPLICATION SETTINGS
# ----------------------------------------------------
APP_ENV=production
APP_NAME="BISmart AI"
DEBUG=False
PORT=8000

# ----------------------------------------------------
# DATABASE CONFIGURATION
# ----------------------------------------------------
# For Production PostgreSQL with pgvector:
DATABASE_URL=postgresql://<db_user>:<db_password>@<db_host>:5432/<db_name>

# Local SQLite fallback (if testing without postgres):
# DATABASE_URL=sqlite:///./bismart.db

# ----------------------------------------------------
# SECURITY & AUTHENTICATION
# ----------------------------------------------------
# Generate with: openssl rand -hex 32
JWT_SECRET=your_super_secret_production_jwt_key_here_change_me
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# ----------------------------------------------------
# AI & LLM PROVIDER
# ----------------------------------------------------
# Set your API key (Gemini / Groq / OpenAI) or 'demo' for grounded in-memory mode
LLM_API_KEY=your_gemini_or_openai_api_key
LLM_PROVIDER=gemini
LLM_MODEL=gemini-1.5-flash

# ----------------------------------------------------
# DIGITAL BHASHINI / SPEECH SERVICES
# ----------------------------------------------------
BHASHINI_API_KEY=your_bhashini_api_key
BHASHINI_USER_ID=your_user_id
BHASHINI_PIPELINE_ID=your_pipeline_id
BIS_OFFICIAL_API_URL=https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/

# ----------------------------------------------------
# STORAGE
# ----------------------------------------------------
UPLOAD_DIR=./data/documents
```

---

## 2. Option A: Docker & Docker Compose (Recommended for SIH Evaluation / VPS)

This is the fastest method to deploy the full stack (PostgreSQL + pgvector, FastAPI backend, and Nginx-powered React frontend) on any Linux/Mac server or Cloud VM.

### Prerequisites
- Docker Engine `>= 24.0`
- Docker Compose `>= 2.20`

### Step 1: Clone and Navigate
```bash
git clone <your-repo-url>
cd bsmart-ai
```

### Step 2: Build & Start All Services
```bash
docker compose up -d --build
```

### Step 3: Verify Running Services
```bash
docker compose ps
```
You should see:
- `bismart-postgres` (Port 5432) — Health: healthy
- `bismart-backend` (Port 8000) — Status: running
- `bismart-frontend` (Port 80) — Status: running

### Step 4: Seed the Database Inside the Container
```bash
docker compose exec backend python scripts/seed_data.py
```

### Step 5: Test the Deployment
- Web Application: `http://<your-server-ip>`
- Backend API Docs: `http://<your-server-ip>:8000/docs`
- Health Check: `http://<your-server-ip>:8000/api/health`

---

## 3. Option B: Cloud PaaS Deployment (Free / Serverless Tier)

Ideal for hackathons, low-latency globally distributed delivery, and zero server maintenance.

```
┌───────────────────────────┐      ┌───────────────────────────┐      ┌───────────────────────────┐
│     Vercel / Netlify      │ ───► │     Render / Railway      │ ───► │    Supabase / Neon DB     │
│   (React + Vite Frontend) │      │      (FastAPI Backend)    │      │   (PostgreSQL + pgvector) │
└───────────────────────────┘      └───────────────────────────┘      └───────────────────────────┘
```

### Step 1: Provision the Managed Database (Supabase / Neon)
1. Go to [Supabase](https://supabase.com) or [Neon](https://neon.tech) and create a new PostgreSQL project.
2. In the SQL Editor, enable the `pgvector` extension:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```
3. Copy your Connection String (`URI`), which looks like:
   `postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### Step 2: Deploy Backend on Render or Railway

#### Via Render:
1. Sign in to [Render](https://render.com) and click **New +** → **Web Service**.
2. Connect your GitHub repository.
3. Configure settings:
   - **Root Directory:** `backend` (or `bsmart-ai/backend`)
   - **Environment:** `Python 3`
   - **Build Command:** `pip install --upgrade pip && pip install -r requirements.txt email-validator`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. In the **Environment Variables** tab, add:
   - `DATABASE_URL`: *(Your Supabase/Neon PostgreSQL URL)*
   - `JWT_SECRET`: `bismart_super_secret_jwt_key_sih2026_secure_random_string_xyz`
   - `APP_ENV`: `production`
   - `LLM_API_KEY`: `demo` *(or your real Gemini/OpenAI key)*
   - `BHASHINI_API_KEY`: `demo`
5. Click **Create Web Service**. Render will build and deploy your backend to `https://bismart-api.onrender.com`.

### Step 3: Deploy Frontend on Vercel
1. Sign in to [Vercel](https://vercel.com) and click **Add New** → **Project**.
2. Import your GitHub repository.
3. Configure the project:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `frontend` (or `bsmart-ai/frontend`)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Create a `vercel.json` file inside `frontend/` to reverse-proxy `/api` to your Render backend:
   ```json
   {
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "https://bismart-api.onrender.com/api/$1"
       },
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
5. Click **Deploy**. Vercel will deploy your React frontend to `https://bismart-ai.vercel.app`.

---

## 4. Option C: Nginx Reverse Proxy with SSL (Domain Setup on Linux VPS)

If hosting on Ubuntu/Debian VM with a custom domain (e.g., `bismart.gov.in` or `bismart.ai`):

### 1. Install Nginx and Certbot
```bash
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
```

### 2. Configure Nginx (`/etc/nginx/sites-available/bismart`)
```nginx
server {
    server_name yourdomain.com www.yourdomain.com;

    # Frontend (Vite static files or container)
    location / {
        proxy_pass http://127.0.0.1:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. Enable Site & Obtain Free SSL Certificate
```bash
sudo ln -s /etc/nginx/sites-available/bismart /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Issue Let's Encrypt SSL
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 5. Post-Deployment Verification Checklist

Run these commands to confirm your production instance is operational:

```bash
# 1. Check API Health
curl -s https://<your-domain>/api/health
# Expected: {"status":"healthy","database":"connected","rag_engine":"ready","bhashini_services":"active"}

# 2. Test Grounded RAG Query with Citation
curl -s -X POST https://<your-domain>/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query": "What is the safety requirement for pressure cookers?", "language": "en"}'
# Expected: Answer grounded in IS 2347:2017 with Clause 5.1 citation

# 3. Test ISI Mark Verification
curl -s -X POST https://<your-domain>/api/verify/isi \
  -H "Content-Type: application/json" \
  -d '{"cml_number": "8400123"}'
# Expected: status: VERIFIED, Hawkins Cookers Limited

# 4. Test HUID Gold Verification
curl -s -X POST https://<your-domain>/api/verify/huid \
  -H "Content-Type: application/json" \
  -d '{"huid": "AA1234"}'
# Expected: status: VERIFIED, 22K 916 Pure Gold
```

---

## 6. Performance & Production Tuning

1. **Uvicorn Production Workers**:
   In production, run Uvicorn with multiple workers depending on CPU cores:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
   ```
2. **CORS Restrictions**:
   In `app/main.py`, update `allow_origins` to only include your production domain:
   ```python
   allow_origins=["https://yourdomain.com", "https://bismart-ai.vercel.app"]
   ```
3. **pgvector Indexing**:
   When storing more than 10,000 document chunks, create an IVFFlat or HNSW vector index:
   ```sql
   CREATE INDEX ON document_chunks USING hnsw (embedding vector_cosine_ops);
   ```
