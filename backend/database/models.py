from sqlalchemy import Column, Integer, String, DateTime, Text
from datetime import datetime

from backend.database.database import Base



class Candidate(Base):

    __tablename__ = "candidates"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    candidate_name = Column(
        String
    )


    resume_filename = Column(
        String
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )



class Evaluation(Base):

    __tablename__ = "evaluations"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    candidate_id = Column(
        Integer
    )


    match_percentage = Column(
        Integer
    )


    decision = Column(
        String
    )


    confidence_score = Column(
        Integer
    )


    reason = Column(
        Text
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )