from flask import Flask
from flask_mongoengine import MongoEngine
from app.config import Config

mongo = MongoEngine()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.static_url_path = '/static'
    mongo.init_app(app)
    
    from app.apis.user_api import user_bp
    from app.apis.image_api import image_bp

    app.register_blueprint(user_bp, url_prefix='/api/users')
    app.register_blueprint(image_bp, url_prefix='/api/images')

    return app
