from pydantic import BaseModel


class RequiredSkill(BaseModel):
    skill: str


class PreferredSkill(BaseModel):
    skill: str


class JobRequirementOutput(BaseModel):
    job_title: str
    experience_required: str
    required_skills: list[RequiredSkill]
    preferred_skills: list[PreferredSkill]
    responsibilities: list[str]