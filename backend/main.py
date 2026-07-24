from fastapi import FastAPI, UploadFile, File, Form
from pydantic import BaseModel

import shutil
import os

from backend.services.recruitment_service import RecruitmentService
from tools.resume_parser import extract_resume_text


app = FastAPI(
    title="HR Recruitment Multi-Agent AI API",
    version="1.0"
)


class CandidateRequest(BaseModel):

    job_requirement: str
    resume: str



@app.get("/")
def home():

    return {
        "message": "HR Recruitment Multi-Agent AI API is running"
    }



@app.post("/analyze-candidate")
def analyze_candidate(
    request: CandidateRequest
):

    service = RecruitmentService()


    result = service.orchestrator.execute(
        request.job_requirement,
        request.resume
    )


    return result



@app.post("/upload-resume")
async def upload_resume(
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


    resume_text = extract_resume_text(
        file_path
    )


    return {
        "filename": file.filename,
        "extracted_text": resume_text
    }



@app.post("/evaluate-resume")
async def evaluate_resume(
    job_requirement: str = Form(
        ...
    ),
    file: UploadFile = File(
        ...
    )
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


    service = RecruitmentService()


    result = service.evaluate_candidate(
        job_requirement,
        file_path
    )


    return result



@app.post("/test-upload")
async def test_upload(
    job_requirement: str = Form(...),
    file: UploadFile = File(...)
):

    return {
        "job_requirement": job_requirement,
        "filename": file.filename
    }