#run from backend/ with:  .venv/bin/pytest
from fastapi.testclient import TestClient
from app.main import app
from app.rules import QUESTIONS, assess

client = TestClient(app)

ALL_QIDS = [q["id"] for q in QUESTIONS]

def answers(**overrides):
    base = {qid: "no" for qid in ALL_QIDS}
    base.update(overrides)
    return base

def test_all_no_finds_nothing():
    result = assess(answers())
    assert result["overall_risk"] == "none"
    assert result["systems"] == []
    assert result["general_obligations"] == []
    assert result["no_ai_message"] is not None

def test_single_high_risk():
    result = assess(answers(q4="yes"))
    assert result["overall_risk"] == "high"
    assert len(result["systems"]) == 1
    assert result["systems"][0]["id"] == "q4"
    assert result["systems"][0]["risk"] == "high"
    #any AI in use => the general obligations show up
    assert len(result["general_obligations"]) == 2

def test_biometric_is_prohibited():
    result = assess(answers(q7="yes"))
    assert result["overall_risk"] == "prohibited"
    assert result["systems"][0]["risk"] == "prohibited"

def test_mixed_takes_highest_risk():
    #minimal (q1) + limited (q3) + high (q4) => overall should be 'high'
    result = assess(answers(q1="yes", q3="not_sure", q4="yes"))
    assert result["overall_risk"] == "high"
    ids = [s["id"] for s in result["systems"]]
    assert ids == ["q1", "q3", "q4"]

def test_all_not_sure_is_prohibited():
    #not_sure counts as yes, and q7 makes the overall 'prohibited'.
    result = assess({qid: "not_sure" for qid in ALL_QIDS})
    assert result["overall_risk"] == "prohibited"
    assert len(result["systems"]) == len(ALL_QIDS)

def test_not_sure_is_treated_like_yes():
    result = assess(answers(q2="not_sure"))
    assert result["overall_risk"] == "limited"
    assert result["systems"][0]["answer"] == "not_sure"

def test_missing_questions_default_to_no():
    result = assess({"q5": "yes"})
    assert result["overall_risk"] == "high"
    assert len(result["systems"]) == 1

#api checks
def test_get_questions_returns_all():
    response = client.get("/api/questions")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == len(ALL_QIDS)
    assert set(data[0].keys()) == {"id", "text", "help"}

def test_assess_endpoint_happy_path():
    response = client.post("/api/assess", json={"answers": answers(q4="yes")})
    assert response.status_code == 200
    assert response.json()["overall_risk"] == "high"

def test_assess_rejects_invalid_answer():
    response = client.post("/api/assess", json={"answers": {"q1": "maybe"}})
    assert response.status_code == 422

def test_assess_pdf_returns_pdf():
    response = client.post("/api/assess/pdf", json={"answers": answers(q4="yes")})
    assert response.status_code == 200
    assert response.headers["content-type"] == "application/pdf"
    assert response.content[:4] == b"%PDF"
