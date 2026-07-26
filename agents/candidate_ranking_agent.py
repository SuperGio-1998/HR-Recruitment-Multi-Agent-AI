class CandidateRankingAgent:

    def __init__(self):
        pass

    def calculate_ranking(
        self,
        skills_score,
        experience_score,
        technical_fit_score,
        interview_score
    ):

        overall_score = int(
            (
                (skills_score * 0.40)
                +
                (experience_score * 0.25)
                +
                (technical_fit_score * 0.20)
                +
                (interview_score * 0.15)
            )
        )

        if overall_score >= 90:

            ranking = "A"

            category = "Excellent Candidate"

            hire_probability = 95

        elif overall_score >= 75:

            ranking = "B"

            category = "Strong Candidate"

            hire_probability = 85

        elif overall_score >= 60:

            ranking = "C"

            category = "Potential Candidate"

            hire_probability = 65

        else:

            ranking = "D"

            category = "Not Recommended"

            hire_probability = 30

        return {

            "ranking": ranking,

            "overall_score": overall_score,

            "candidate_category": category,

            "hire_probability": hire_probability,

            "technical_fit_score": technical_fit_score,

            "interview_score": interview_score

        }