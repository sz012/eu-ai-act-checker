#.venv/bin/uvicorn app.main:app --reload
from fastapi import FastAPI

app = FastAPI(
    title="EU AI Act Checker API",
    description="Questionnaire-based EU AI Act risk self-assessment. Not legal advice.",
    version="0.1.0",
)

@app.get("/health")
def health_check():
    return {"status": "ok"}
