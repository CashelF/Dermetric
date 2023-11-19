from datetime import datetime
from flask_mongoengine import Document
from mongoengine.fields import ObjectIdField, StringField, EmailField, DateTimeField, ListField

class User(Document):
    _id = ObjectIdField(primary_key=True)
    username = StringField(required=True)
    email = EmailField(required=True)
    password = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)
    uploaded_images = ListField(StringField())
