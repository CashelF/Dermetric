from datetime import datetime
from flask_pymongo import PyMongo

class Image:
    def __init__(self, user_id, filename, file_path, classification=None):
        self.user_id = user_id
        self.filename = filename
        self.file_path = file_path
        self.created_at = datetime.utcnow()
        self.classification = classification

    @classmethod
    def from_dict(cls, data):
        return cls(
            user_id=data['user_id'],
            filename=data['filename'],
            file_path=data['file_path'],
            classification=data.get('classification')
        )

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'filename': self.filename,
            'file_path': self.file_path,
            'created_at': self.created_at,
            'classification': self.classification
        }
