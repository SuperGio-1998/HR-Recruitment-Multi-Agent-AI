from tools.resume_parser import extract_resume_text
from orchestrator.hr_orchestrator import HROrchestrator

from backend.database.database import SessionLocal

from backend.database.crud import (
    create_candidate,
    create_evaluation
)


class RecruitmentService:


    def __init__(self):

        self.orchestrator = HROrchestrator()



    def evaluate_candidate(
        self,
        job_requirement,
        resume_file_path
    ):


        resume_text = extract_resume_text(
            resume_file_path
        )


        result = self.orchestrator.execute(
            job_requirement,
            resume_text
        )



        db = SessionLocal()


        try:

            candidate_profile = result[
                "candidate_profile"
            ]


            skills_evaluation = result[
                "skills_evaluation"
            ]


            hiring_decision = result[
                "hiring_decision"
            ]
            
            candidate_ranking = result[
                "candidate_ranking"
            ]           


            candidate = create_candidate(
                db=db,
                candidate_name=candidate_profile[
                    "candidate_name"
                ],
                resume_filename=resume_file_path.split("\\")[-1]
            )



            create_evaluation(
                db=db,
                candidate_id=candidate.id,
                match_percentage=skills_evaluation[
                    "overall_match_percentage"
                ],
                decision=hiring_decision[
                    "final_decision"
                ],
                confidence_score=hiring_decision[
                    "confidence_score"
                ],
                reason=hiring_decision[
                    "reason"
                ],
                
                ranking=candidate_ranking[
                    "ranking"
                ],

                overall_score=candidate_ranking[
                    "overall_score"
                ],

                candidate_category=candidate_ranking[
                    "candidate_category"
                ],

                hire_probability=candidate_ranking[
                    "hire_probability"
                ],

                technical_fit_score=candidate_ranking[
                    "technical_fit_score"
                ],

                interview_score=candidate_ranking[
                    "interview_score"
                ]   
            )


        finally:

            db.close()



        return result