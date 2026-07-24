from config.llm import get_llm
from schemas.hiring_decision_schema import HiringDecisionOutput
import json


class HiringDecisionAgent:

    def __init__(self):

        self.llm = get_llm()


    def evaluate(
        self,
        candidate_profile,
        skills_evaluation,
        interview_assessment
    ):


        prompt = f"""
You are an AI HR Hiring Decision Specialist.

Evaluate the candidate based on:

Candidate Profile:
{candidate_profile}


Skills Evaluation:
{skills_evaluation}


Interview Assessment:
{interview_assessment}


Provide a final hiring recommendation.

Return ONLY valid JSON.

Rules:
- No markdown.
- No explanation outside JSON.
- Keep reason concise.
- Always close JSON properly.


Use exactly this format:

{{
    "candidate_name": "",
    "final_decision": "",
    "confidence_score": 0,
    "strengths": [
        {{
            "description": ""
        }}
    ],
    "concerns": [
        {{
            "description": ""
        }}
    ],
    "reason": ""
}}
"""


        response = self.llm.invoke(prompt)


        result = response.content


        result = result.replace("```json", "")
        result = result.replace("```", "").strip()


        print("\n===== HIRING DECISION RAW OUTPUT =====")
        print(result)


        try:
            json.loads(result)

        except json.JSONDecodeError:

            if result.count("{") > result.count("}"):
                result = result + "}"


        validated = HiringDecisionOutput.model_validate_json(result)


        return validated.model_dump_json(indent=2)



if __name__ == "__main__":


    agent = HiringDecisionAgent()


    candidate = """
    John Doe
    5 years QA Engineer
    Skills:
    Selenium
    API Testing
    SQL
    Python
    """


    skills = """
    Match Percentage: 80%

    Missing:
    Banking Experience
    """


    interview = """
    Strong Selenium knowledge.
    Good API testing background.
    Need to validate banking domain knowledge.
    """


    result = agent.evaluate(
        candidate,
        skills,
        interview
    )


    print("\n===== FINAL DECISION =====")
    print(result)