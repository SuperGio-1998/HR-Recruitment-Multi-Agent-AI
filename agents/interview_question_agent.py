from config.llm import get_llm
from schemas.interview_schema import InterviewOutput
import json


class InterviewQuestionAgent:

    def __init__(self):
        self.llm = get_llm()


    def generate_questions(
        self,
        job_requirement,
        candidate_profile,
        skills_result
    ):

        prompt = f"""
You are an AI HR Interview Specialist.

Generate interview questions based on the evaluation.

Job Requirement:
{job_requirement}

Candidate Profile:
{candidate_profile}

Skills Evaluation:
{skills_result}


Return ONLY valid JSON.

Rules:
- No markdown.
- No explanation.
- Keep recommendation short.
- Always close JSON properly.

Format:

{{
    "technical_questions": [
        {{
            "question": "",
            "category": ""
        }}
    ],
    "assessment_focus": [
        {{
            "focus": ""
        }}
    ],
    "recommendation": ""
}}
"""


        response = self.llm.invoke(prompt)

        result = response.content

        result = result.replace("```json", "")
        result = result.replace("```", "").strip()


        print("\n===== INTERVIEW RAW OUTPUT =====")
        print(result)


        try:
            json.loads(result)

        except json.JSONDecodeError:

            if result.count("{") > result.count("}"):
                result = result + "}"


        validated = InterviewOutput.model_validate_json(result)

        return validated.model_dump_json(indent=2)