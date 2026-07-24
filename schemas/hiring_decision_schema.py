from pydantic import BaseModel


class Strength(BaseModel):
    description: str


class Concern(BaseModel):
    description: str


class HiringDecisionOutput(BaseModel):
    candidate_name: str
    final_decision: str
    confidence_score: int
    strengths: list[Strength]
    concerns: list[Concern]
    reason: str