from pydantic import BaseModel


class ScoreBreakdown(BaseModel):

    skills_score: int
    experience_score: int
    overall_score: int



class AIIntelligenceOutput(BaseModel):

    candidate_name: str

    decision: str

    confidence_score: int

    score_breakdown: ScoreBreakdown

    strengths: list[str]

    concerns: list[str]

    recommendation: str