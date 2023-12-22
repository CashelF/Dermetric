import os
from flask import Blueprint, request, jsonify, current_app
from app.services.ml_service import MLService
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'IMAGES_UPLOAD_FOLDER'
ml_bp = Blueprint('ml_bp', __name__)

@ml_bp.route('/predict', methods=['POST'])
def predict():
  file = request.files['file']
  temp_path = os.path.join(current_app.config[UPLOAD_FOLDER], secure_filename(file.filename))
  try:
    file.save(temp_path)
    model = MLService()
    prediction = model.predict(temp_path)
    return jsonify({'prediction': prediction})

  except Exception as e:
    return jsonify({'error': str(e)}), 500
  
  finally:
    if os.path.exists(temp_path):
      os.remove(temp_path)
