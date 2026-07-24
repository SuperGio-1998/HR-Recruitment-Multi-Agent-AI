from config.llm import get_llm
from schemas.job_requirement_schema import JobRequirementOutput


class JobRequirementAgent:

    def __init__(self):
        self.llm = get_llm()

    def analyze_job_requirement(self, job_requirement):

        prompt = f"""
You are an HR Recruitment Requirement Analyst.

Analyze the following job description.

Job Description:
{job_requirement}

Return ONLY valid JSON.

Do not add markdown.
Do not add explanations.

Use exactly this format:

{{
    "job_title": "",
    "experience_required": "",
    "required_skills": [
        {{
            "skill": ""
        }}
    ],
    "preferred_skills": [
        {{
            "skill": ""
        }}
    ],
    "responsibilities": [
        ""
    ]
}}
"""

        response = self.llm.invoke(prompt)

        result = response.content
        result = result.replace("```json", "")
        result = result.replace("```", "").strip()

        validated = JobRequirementOutput.model_validate_json(result)

        return validated.model_dump_json(indent=2)


if __name__ == "__main__":

    agent = JobRequirementAgent()

    sample_job = """
    Hiring: Senior QA Engineer

    Requirements:
    - 3+ years QA experience
    - Selenium
    - API Testing
    - SQL
    - Python

    Preferred:
    - Banking Experience
    - JMeter

    Responsibilities:
    - Execute test cases
    - Perform API testing
    - Participate in Agile ceremonies
    """

    result = agent.analyze_job_requirement(sample_job)

    print(result)