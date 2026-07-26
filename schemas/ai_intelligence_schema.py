from pydantic import BaseModel



class ScoreBreakdown(BaseModel):

    skills_score: int

    experience_score: int

    technical_fit_score: int

    interview_score: int

    overall_score: int





class AIIntelligenceOutput(BaseModel):


    candidate_name: str


    decision: str


    confidence_score: int


    ranking: str


    hire_probability: int


    candidate_category: str


    score_breakdown: ScoreBreakdown


    strengths: list[str]


    concerns: list[str]


    recommendation: str