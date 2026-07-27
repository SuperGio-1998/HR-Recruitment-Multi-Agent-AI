from fastapi import FastAPI, UploadFile, File, Form, Query
from fastapi.middleware.cors import CORSMiddleware

import os
import shutil

from backend.services.recruitment_service import RecruitmentService

from backend.database.database import SessionLocal
from backend.database.models import Candidate, Evaluation



app = FastAPI(
    title="HR Recruitment Multi-Agent AI API",
    version="1.0"
)



# Allow React Frontend Connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



recruitment_service = RecruitmentService()





@app.get("/")
def home():

    return {
        "message": "HR Recruitment Multi-Agent AI API is running"
    }





@app.post("/evaluate-resume")
async def evaluate_resume(
    job_requirement: str = Form(...),
    file: UploadFile = File(...)
):

    upload_folder = "uploads"


    os.makedirs(
        upload_folder,
        exist_ok=True
    )


    file_path = f"{upload_folder}/{file.filename}"


    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )


    result = recruitment_service.evaluate_candidate(
        job_requirement,
        file_path
    )


    return result







@app.get("/candidates")
def get_candidates(

    name: str | None = Query(default=None),

    decision: str | None = Query(default=None),

    min_score: int | None = Query(default=None),

    page: int = Query(
        default=1,
        ge=1
    ),

    limit: int = Query(
        default=10,
        ge=1,
        le=100
    ),

    sort: str | None = Query(
        default=None
    )

):


    db = SessionLocal()


    try:


        candidates = db.query(
            Candidate
        ).join(
            Evaluation,
            Candidate.id == Evaluation.candidate_id
        ).order_by(
            Evaluation.overall_score.desc(),
            Evaluation.hire_probability.desc(),
            Evaluation.created_at.desc()
        ).all()
        



        filtered_candidates = []



        for candidate in candidates:


            evaluation = db.query(
                Evaluation
            ).filter(
                Evaluation.candidate_id == candidate.id
            ).first()



            if name:

                if name.lower() not in candidate.candidate_name.lower():

                    continue



            if decision:

                if not evaluation:

                    continue


                if evaluation.decision.lower() != decision.lower():

                    continue



            if min_score:

                if not evaluation:

                    continue


                if evaluation.match_percentage < min_score:

                    continue



            filtered_candidates.append({

                "id": candidate.id,

                "candidate_name": candidate.candidate_name,

                "resume_filename": candidate.resume_filename,

                "created_at": candidate.created_at,

                "match_percentage":
                    evaluation.match_percentage
                    if evaluation else None,

                "decision":
                    evaluation.decision
                    if evaluation else None,

                "confidence_score":
                    evaluation.confidence_score
                    if evaluation else None,
                    
                "ranking":
                    evaluation.ranking
                    if evaluation else None,


                "overall_score":
                    evaluation.overall_score
                    if evaluation else None,


                "candidate_category":
                    evaluation.candidate_category
                    if evaluation else None,


                "hire_probability":
                    evaluation.hire_probability
                    if evaluation else None,


                "technical_fit_score":
                    evaluation.technical_fit_score
                    if evaluation else None,


                "interview_score":
                    evaluation.interview_score
                    if evaluation else None

            })





        # Sorting

        if sort == "highest_score":

            filtered_candidates.sort(

                key=lambda x:
                    x["match_percentage"]
                    if x["match_percentage"] is not None
                    else 0,

                reverse=True

            )



        elif sort == "lowest_score":

            filtered_candidates.sort(

                key=lambda x:
                    x["match_percentage"]
                    if x["match_percentage"] is not None
                    else 0

            )



        elif sort == "latest":

            filtered_candidates.sort(

                key=lambda x:
                    x["created_at"],

                reverse=True

            )





        total_candidates = len(
            filtered_candidates
        )



        start = (
            page - 1
        ) * limit



        end = start + limit



        paginated_result = filtered_candidates[
            start:end
        ]



        return {

            "page": page,

            "limit": limit,

            "total_candidates": total_candidates,

            "results": paginated_result

        }



    finally:

        db.close()







@app.get("/candidate/{candidate_id}")
def get_candidate_detail(candidate_id: int):


    db = SessionLocal()


    try:


        candidate = db.query(
            Candidate
        ).filter(
            Candidate.id == candidate_id
        ).first()



        if not candidate:

            return {

                "message": "Candidate not found"

            }



        evaluation = db.query(
            Evaluation
        ).filter(
            Evaluation.candidate_id == candidate.id
        ).first()



        return {


            "candidate": {

                "id": candidate.id,

                "candidate_name": candidate.candidate_name,

                "resume_filename": candidate.resume_filename,

                "created_at": candidate.created_at

            },


            "evaluation": {

                "match_percentage":
                    evaluation.match_percentage
                    if evaluation else None,


                "decision":
                    evaluation.decision
                    if evaluation else None,


                "confidence_score":
                    evaluation.confidence_score
                    if evaluation else None,


                "reason":
                    evaluation.reason
                    if evaluation else None

            }

        }



    finally:

        db.close()