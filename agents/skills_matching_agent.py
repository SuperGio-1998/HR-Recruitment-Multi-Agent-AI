from config.llm import get_llm
from schemas.skills_match_schema import SkillsMatchOutput
import json


class SkillsMatchingAgent:

    def __init__(self):
        self.llm = get_llm()


    def compare(self, job_requirement, resume):

        prompt = f"""
You are an AI HR Skills Matching Specialist.

Compare the Job Requirement and Candidate Resume.

Job Requirement:
{job_requirement}

Candidate Resume:
{resume}

Return ONLY valid JSON.

Rules:
- Do not add markdown.
- Do not add explanations.
- Keep recommendation under 10 words.
- Always close all JSON brackets.

Use exactly this format:

{{
    "overall_match_percentage": 0,
    "matched_skills": [
        {{
            "skill": ""
        }}
    ],
    "missing_skills": [
        {{
            "skill": ""
        }}
    ],
    "recommendation": ""
}}
"""

        response = self.llm.invoke(prompt)

        result = response.content

        result = result.replace("```json", "")
        result = result.replace("```", "").strip()


        print("\n===== RAW LLM OUTPUT =====")
        print(result)


        # Auto repair incomplete JSON
        try:
            json.loads(result)

        except json.JSONDecodeError:

            if result.count("{") > result.count("}"):
                result = result + "}"


        validated = SkillsMatchOutput.model_validate_json(result)

        return validated.model_dump_json(indent=2)



if __name__ == "__main__":

    agent = SkillsMatchingAgent()


    sample_job = """
    Senior QA Engineer

    Required Skills:
    Selenium
    API Testing
    SQL
    Python
    Banking Experience
    """


    sample_resume = """
    John Doe

    Experience:
    5 years Software QA Engineer

    Skills:
    Selenium
    API Testing
    SQL
    Python

    Project:
    Online Banking System
    """


    result = agent.compare(
        sample_job,
        sample_resume
    )


    print("\n===== FINAL OUTPUT =====")
    print(result)