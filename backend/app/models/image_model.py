from datetime import datetime
from flask_mongoengine import Document
from mongoengine.fields import ObjectIdField, StringField, DateTimeField, ReferenceField

class Image(Document):
    _id = ObjectIdField(primary_key=True)
    user_id = StringField(required=True)
    filename = StringField(required=True)
    file_path = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)
    classification = StringField()

    user = ReferenceField('User', reverse_delete_rule=2)
