#run from backend/ with:  .venv/bin/uvicorn app.main:app --reload
import os

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from app import rules
from app.pdf import build_pdf
from app.schemas import AssessRequest, AssessResponse, QuestionPublic

app = FastAPI(
    title="EU AI Act Checker API",
    description="Questionnaire-based EU AI Act risk self-assessment. Not legal advice.",
    version="0.1.0",
)

FRONTEND_ORIGIN = os.environ.get("FRONTEND_ORIGIN")
if FRONTEND_ORIGIN:
    cors_origins = {"allow_origins": [FRONTEND_ORIGIN]}
else:
    cors_origins = {"allow_origin_regex": r"https?://(localhost|127\.0\.0\.1):\d+"}

app.add_middleware(
    CORSMiddleware,
    **cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/questions", response_model=list[QuestionPublic])
def get_questions():
    return rules.public_questions()

@app.post("/api/assess", response_model=AssessResponse)
def assess(request: AssessRequest):
    answers = {qid: answer.value for qid, answer in request.answers.items()}
    return rules.assess(answers)

@app.post("/api/assess/pdf")
def assess_pdf(request: AssessRequest):
    answers = {qid: answer.value for qid, answer in request.answers.items()}
    result = rules.assess(answers)
    pdf_bytes = build_pdf(result)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=ai-act-report.pdf"},
    )
