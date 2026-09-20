#!/bin/bash
set -e

echo "=========================================================="
echo " BISmart AI – Smart India Hackathon 2026 (SIH26107)"
echo " AI-Powered Assistant for Indian Standards & BIS Services"
echo "=========================================================="

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

# 1. Initialize & Seed Database
echo "[1/3] Checking Database and Seeds..."
PYTHONPATH="$BACKEND_DIR" "$BACKEND_DIR/venv/bin/python" "$BACKEND_DIR/scripts/seed_data.py"

# 2. Run Test Suite
echo "[2/3] Running Verification & RAG Test Suite..."
PYTHONPATH="$BACKEND_DIR" "$BACKEND_DIR/venv/bin/pytest" "$BACKEND_DIR/tests/" -v --disable-warnings

# 3. Start Backend
echo "[3/3] Starting Backend & Frontend..."
echo "Starting FastAPI backend on http://127.0.0.1:8000 (Docs: http://127.0.0.1:8000/docs)"
(cd "$BACKEND_DIR" && PYTHONPATH="." ./venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000) &
BACKEND_PID=$!

echo "Starting React Vite frontend on http://localhost:5173"
(cd "$FRONTEND_DIR" && npm run dev) &
FRONTEND_PID=$!

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT

wait
