from api.app.repositories.user import UserRepository
from app.models.dtos import UserDto


class UserService:

    def __init__(self, repository: UserRepository):
        self.repository = repository

    def get_users(self):

        users = self.repository.get_all()

        return [
            UserDto.model_validate(user)
            for user in users
        ]

    def get_user(self, user_id: int):

        user = self.repository.get_by_id(user_id)

        if not user:
            return None

        return UserDto.model_validate(user)