from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.user import User
from app.core.security import verify_access_token


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials

    payload = verify_access_token(token)

    if payload is None:
        print("AUTH DEBUG: Token verification failed")
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
        )

    user_id = payload.get("sub")

    if user_id is None:
        print("AUTH DEBUG: Token has no sub claim")
        raise HTTPException(
            status_code=401,
            detail="Invalid token",
        )

    try:
        user_id = int(user_id)
    except (TypeError, ValueError):
        print("AUTH DEBUG: Invalid user ID in token")
        raise HTTPException(
            status_code=401,
            detail="Invalid token subject",
        )

    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        print("AUTH DEBUG: User ID not found:", user_id)
        raise HTTPException(
            status_code=401,
            detail="User not found",
        )

    if user.status != "Active":
        raise HTTPException(
            status_code=403,
            detail="User account is inactive",
        )

    return user

def require_admin(
    current_user=Depends(get_current_user),
):
    if current_user.role != "Admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return current_user