from config.llm import get_llm
from schemas.ai_intelligence_schema import AIIntelligenceOutput


class CandidateIntelligenceAgent:


    def __init__(self):

        self.llm = get_llm()



    def analyze(
        self,
        candidate_profile,
        skills_evaluation,
        hiring_decision
    ):


        prompt = f"""
You are an AI Candidate Intelligence Specialist.

Analyze the candidate using the provided HR evaluation data.

Candidate Profile:

{candidate_profile}


Skills Evaluation:

{skills_evaluation}


Hiring Decision:

{hiring_decision}


Generate an intelligence summary.

Return ONLY valid JSON.

No markdown.
No explanation.

Use exactly this format:

{{
    "candidate_name": "",
    "decision": "",
    "confidence_score": 0,

    "score_breakdown": {{
        "skills_score": 0,
        "experience_score": 0,
        "overall_score": 0
    }},

    "strengths": [
        ""
    ],

    "concerns": [
        ""
    ],

    "recommendation": ""
}}
"""


        response = self.llm.invoke(prompt)


        result = response.content


        result = result.replace("```json", "")
        result = result.replace("```", "").strip()



        validated = AIIntelligenceOutput.model_validate_json(
            result
        )


        return validated.model_dump_json(
            indent=2
        )