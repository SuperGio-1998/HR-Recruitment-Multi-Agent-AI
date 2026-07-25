from agents.job_requirement_agent import JobRequirementAgent
from agents.resume_screening_agent import ResumeScreeningAgent
from agents.skills_matching_agent import SkillsMatchingAgent
from agents.interview_question_agent import InterviewQuestionAgent
from agents.hiring_decision_agent import HiringDecisionAgent

from pathlib import Path
import json


class HROrchestrator:


    def __init__(self):

        self.job_agent = JobRequirementAgent()
        self.resume_agent = ResumeScreeningAgent()
        self.skills_agent = SkillsMatchingAgent()
        self.interview_agent = InterviewQuestionAgent()
        self.decision_agent = HiringDecisionAgent()



    def execute(
        self,
        job_requirement,
        resume
    ):


        print("\n===== JOB REQUIREMENT AGENT =====")


        job_output = self.job_agent.analyze_job_requirement(
            job_requirement
        )

        job_json = json.loads(job_output)

        print(json.dumps(job_json, indent=2))



        print("\n===== RESUME SCREENING AGENT =====")


        resume_output = self.resume_agent.analyze_resume(
            resume
        )

        resume_json = json.loads(resume_output)

        print(json.dumps(resume_json, indent=2))



        print("\n===== SKILLS MATCHING AGENT =====")


        skills_output = self.skills_agent.compare(
            job_json,
            resume_json
        )

        skills_json = json.loads(skills_output)

        print(json.dumps(skills_json, indent=2))



        print("\n===== INTERVIEW QUESTION AGENT =====")


        interview_output = self.interview_agent.generate_questions(
            job_json,
            resume_json,
            skills_json
        )

        interview_json = json.loads(interview_output)

        print(json.dumps(interview_json, indent=2))



        print("\n===== HIRING DECISION AGENT =====")


        decision_output = self.decision_agent.evaluate(
            resume_json,
            skills_json,
            interview_json
        )

        decision_json = json.loads(decision_output)

        print(json.dumps(decision_json, indent=2))



        final_output = {

            "job_analysis": job_json,

            "candidate_profile": resume_json,

            "skills_evaluation": skills_json,

            "interview_questions": interview_json,

            "hiring_decision": decision_json

        }



        print("\n===== FINAL HR PACKAGE =====")


        print(
            json.dumps(
                final_output,
                indent=2
            )
        )



        # Save HR Report

        report_folder = Path("reports")

        report_folder.mkdir(
            exist_ok=True
        )


        report_file = report_folder / "candidate_evaluation.json"


        report_file.write_text(
            json.dumps(
                final_output,
                indent=2
            ),
            encoding="utf-8"
        )


        print("\n===== REPORT GENERATED =====")

        print(
            f"Saved: {report_file}"
        )


        return final_output