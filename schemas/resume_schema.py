from pydantic import BaseModel


class Skill(BaseModel):
    skill: str


class Certification(BaseModel):
    certification: str


class Project(BaseModel):
    project: str


class ResumeOutput(BaseModel):
    candidate_name: str
    years_experience: str
    skills: list[Skill]
    education: str
    certifications: list[Certification]
    projects: list[Project]