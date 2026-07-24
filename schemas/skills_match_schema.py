from pydantic import BaseModel


class MatchedSkill(BaseModel):
    skill: str


class MissingSkill(BaseModel):
    skill: str


class SkillsMatchOutput(BaseModel):
    overall_match_percentage: int
    matched_skills: list[MatchedSkill]
    missing_skills: list[MissingSkill]
    recommendation: str