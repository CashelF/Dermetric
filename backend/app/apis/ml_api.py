from flask import Blueprint, request, jsonify
from app.services import ml_service

ml_bp = Blueprint('ml_bp', __name__)

@ml_bp.route('/predict', methods=['POST'])
def predict():
    try:
        prediction = ml_service.predict(request.files['image'])
        return jsonify({'prediction': prediction})

    except Exception as e:
        return jsonify({'error': str(e)})
