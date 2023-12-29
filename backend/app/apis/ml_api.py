import io
from flask import Blueprint, request, jsonify, current_app
from app.services.ml_service import MLService
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'IMAGES_UPLOAD_FOLDER'
ml_bp = Blueprint('ml_bp', __name__)

@ml_bp.route('/predict', methods=['POST'])
def predict():
  file = request.files['file']
  if file:
    try:
      # Read the file to an in-memory file object
      in_memory_file = io.BytesIO()
      file.save(in_memory_file)
      in_memory_file.seek(0)

      model = MLService()
      prediction = model.predict(in_memory_file)
      in_memory_file.close()
      return jsonify({'prediction': prediction})

    except Exception as e:
      in_memory_file.close()
      return jsonify({'error': str(e)}), 500

  return jsonify({'error': 'No file provided'}), 400
