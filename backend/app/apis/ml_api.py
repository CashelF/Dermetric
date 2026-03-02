import io
import gc
from flask import Blueprint, request, jsonify
from app.services.ml_service import MLService

ml_bp = Blueprint('ml_bp', __name__)

@ml_bp.route('/predict', methods=['POST'])
def predict():
  file = request.files.get('file')
  if not file:
    return jsonify({'error': 'No file provided'}), 400

  in_memory_file = None
  try:
    in_memory_file = io.BytesIO()
    file.save(in_memory_file)
    in_memory_file.seek(0)

    model_service = MLService()
    prediction = model_service.predict(in_memory_file)
    return jsonify({'prediction': prediction})

  except Exception as e:
    return jsonify({'error': str(e)}), 500
  finally:
    if in_memory_file:
      in_memory_file.close()
    gc.collect()
