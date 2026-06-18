# EU AI Act Checker

A web app that helps small businesses figure out which EU AI Act rules apply to them. You answer a few questions about how your company uses AI and get back the risk level of each system and what you actually need to do — plus a downloadable PDF report.

Why: the EU AI Act adds new obligations for companies using AI, with deadlines in 2026. Most small businesses have no idea where they stand, and the tools that exist are built for big corporations.

(!) Not legal advice. This is a simplified informational self-assessment. The risk mapping is intentionally simplified and the Act is still being amended.

## Tech stack

- **Frontend:** React (Vite) + react-router
- **Backend:** Python / FastAPI
- **PDF:** ReportLab
- No database — results are computed on the fly.

## Running locally

**Backend** (Python 3.12+):
```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
.venv/bin/uvicorn app.main:app --reload
```
API runs at `http://127.0.0.1:8000` (interactive docs at `/docs`).

**Frontend** (Node 18+):
```bash
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:5173`.

## Running the tests

```bash
cd backend
.venv/bin/pytest
```
