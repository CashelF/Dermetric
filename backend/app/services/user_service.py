from app.models.user_model import User
from app import mongo
from mongoengine.errors import DoesNotExist

class UserService:
    @staticmethod
    def get_user_by_id(user_id):
        try:
            user = User.objects.get(id=user_id)
            return user
        except DoesNotExist:
            return None

    @staticmethod
    def create_user(username, email, hashed_password):
        new_user = User(username=username, email=email, password=hashed_password)
        new_user.save()
        return new_user

    @staticmethod
    def update_user(user_id, new_data):
        user = UserService.get_user_by_id(user_id)
        if user:
            for key, value in new_data.items():
                setattr(user, key, value)

            user.save()

        return user

    @staticmethod
    def delete_user(user_id):
        user = UserService.get_user_by_id(user_id)
        if user:
            user.delete()

        return user
