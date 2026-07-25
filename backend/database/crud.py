from sqlalchemy.orm import Session

from backend.database.models import Candidate, Evaluation


def create_candidate(
    db: Session,
    candidate_name: str,
    resume_filename: str
):

    candidate = Candidate(
        candidate_name=candidate_name,
        resume_filename=resume_filename
    )

    db.add(candidate)
    db.commit()
    db.refresh(candidate)

    return candidate


def create_evaluation(
    db: Session,
    candidate_id: int,
    match_percentage: int,
    decision: str,
    confidence_score: int,
    reason: str
):

    evaluation = Evaluation(
        candidate_id=candidate_id,
        match_percentage=match_percentage,
        decision=decision,
        confidence_score=confidence_score,
        reason=reason
    )

    db.add(evaluation)
    db.commit()
    db.refresh(evaluation)

    return evaluation


def get_candidates(db: Session):

    return db.query(Candidate).all()


def get_evaluations(db: Session):

    return db.query(Evaluation).all()