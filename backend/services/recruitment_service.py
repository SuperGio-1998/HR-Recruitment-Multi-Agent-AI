from tools.resume_parser import extract_resume_text
from orchestrator.hr_orchestrator import HROrchestrator


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


        return result