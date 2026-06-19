from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.repositories.user import UserRepository
from app.services.user import UserService

router = APIRouter()


@router.get("/")
def get_users(db: Session = Depends(get_db)):

    repository = UserRepository(db)
    service = UserService(repository)

    return service.get_users()


@router.get("/{user_id}")
def get_user(user_id: int,
             db: Session = Depends(get_db)):

    repository = UserRepository(db)
    service = UserService(repository)

    user = service.get_user(user_id)

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user