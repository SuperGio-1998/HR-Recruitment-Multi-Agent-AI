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
    reason: str,
    ranking: str,
    overall_score: int,
    candidate_category: str,
    hire_probability: int,
    technical_fit_score: int,
    interview_score: int
):

    evaluation = Evaluation(
        candidate_id=candidate_id,
        match_percentage=match_percentage,
        decision=decision,
        confidence_score=confidence_score,
        reason=reason,
        ranking=ranking,

        overall_score=overall_score,

        candidate_category=candidate_category,

        hire_probability=hire_probability,

        technical_fit_score=technical_fit_score,

        interview_score=interview_score
    )

    db.add(evaluation)
    db.commit()
    db.refresh(evaluation)

    return evaluation


def get_candidates(db: Session):

    return db.query(Candidate).all()


def get_evaluations(db: Session):

    return db.query(Evaluation).all()