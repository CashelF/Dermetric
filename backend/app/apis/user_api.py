from flask import Blueprint
from app.models.user_model import User
from app.services.user_service import UserService
from app.utils.hashing_utils import hash_password

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    return

@user_bp.route('/users', methods=['POST'])
def create_user():
    return
