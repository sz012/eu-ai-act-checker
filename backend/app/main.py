#run from backend/ with:  .venv/bin/uvicorn app.main:app --reload
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import rules
from app.schemas import AssessRequest, AssessResponse, QuestionPublic

app = FastAPI(
    title="EU AI Act Checker API",
    description="Questionnaire-based EU AI Act risk self-assessment. Not legal advice.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
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
