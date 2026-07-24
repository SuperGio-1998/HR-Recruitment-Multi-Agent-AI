from pydantic import BaseModel


class InterviewQuestion(BaseModel):
    question: str
    category: str


class AssessmentFocus(BaseModel):
    focus: str


class InterviewOutput(BaseModel):
    technical_questions: list[InterviewQuestion]
    assessment_focus: list[AssessmentFocus]
    recommendation: str