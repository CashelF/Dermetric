from flask import Blueprint, jsonify, request, current_app
from werkzeug.utils import secure_filename
import os

image_bp = Blueprint('image_bp', __name__)

UPLOAD_FOLDER = 'IMAGES_UPLOAD_FOLDER'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_filename_length(filename):
    max_filename_length = 150
    return len(filename) <= max_filename_length

@image_bp.route('/images', methods=['GET'])
def get_images():
    return

@image_bp.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    
    if not file:
        return jsonify({'error': 'No file part'})

    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file format'})
    
    if not validate_filename_length(file.filename):
        return jsonify({'error': 'Filename too long'})

    filename = secure_filename(file.filename)
    file.save(os.path.join(current_app.config[UPLOAD_FOLDER], filename))
    return jsonify({'message': 'Image uploaded successfully'})
