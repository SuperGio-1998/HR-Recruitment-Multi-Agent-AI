from config.llm import get_llm
from schemas.resume_schema import ResumeOutput


class ResumeScreeningAgent:

    def __init__(self):
        self.llm = get_llm()

    def analyze_resume(self, resume):

        prompt = f"""
You are an HR Resume Screening Specialist.

Analyze the following resume.

Resume:

{resume}

Return ONLY valid JSON.

Do not add markdown.
Do not add explanations.

Use exactly this format:

{{
    "candidate_name": "",
    "years_experience": "",
    "skills": [
        {{
            "skill": ""
        }}
    ],
    "education": "",
    "certifications": [
        {{
            "certification": ""
        }}
    ],
    "projects": [
        {{
            "project": ""
        }}
    ]
}}
"""

        response = self.llm.invoke(prompt)

        result = response.content
        result = result.replace("```json", "")
        result = result.replace("```", "").strip()

        validated = ResumeOutput.model_validate_json(result)

        return validated.model_dump_json(indent=2)


if __name__ == "__main__":

    agent = ResumeScreeningAgent()

    sample_resume = """
    Name: John Doe

    Experience:
    5 years Software QA Engineer

    Skills:
    Selenium
    API Testing
    SQL
    Python

    Education:
    BS Information Technology

    Certifications:
    ISTQB Foundation Level

    Projects:
    Online Banking System
    """

    result = agent.analyze_resume(sample_resume)

    print(result)