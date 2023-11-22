from datetime import datetime
from flask_pymongo import PyMongo

class User:
    def __init__(self, username, email, password, uploaded_images=None):
        self.username = username
        self.email = email
        self.password = password
        self.created_at = datetime.utcnow()
        self.uploaded_images = uploaded_images or []

    @classmethod
    def from_dict(cls, data):
        return cls(
            username=data['username'],
            email=data['email'],
            password=data['password'],
            uploaded_images=data.get('uploaded_images', [])
        )

    def to_dict(self):
        return {
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'created_at': self.created_at,
            'uploaded_images': self.uploaded_images
        }
