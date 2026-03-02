from flask import Flask
from flask_cors import CORS
from app.config import Config

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    from app.apis.ml_api import ml_bp
    app.register_blueprint(ml_bp, url_prefix='/api/ml')

    return app
