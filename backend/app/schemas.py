from enum import Enum
from pydantic import BaseModel

class Answer(str, Enum):
    yes = "yes"
    no = "no"
    not_sure = "not_sure"

class AssessRequest(BaseModel):
    #{"answers": {"q1": "yes", "q2": "no", ...}}
    answers: dict[str, Answer]

class SystemResult(BaseModel):
    id: str
    area: str
    answer: str
    risk: str
    obligations: list[str]

class AssessResponse(BaseModel):
    overall_risk: str
    systems: list[SystemResult]
    general_obligations: list[str]
    no_ai_message: str | None
    disclaimer: str

class QuestionPublic(BaseModel):
    id: str
    text: str
    help: str
