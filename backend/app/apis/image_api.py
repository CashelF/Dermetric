from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os

image_bp = Blueprint('image_bp', __name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

image_bp.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@image_bp.route('/images', methods=['GET'])
def get_images():
    return

@image_bp.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(image_bp.config['UPLOAD_FOLDER'], filename))
        return jsonify({'message': 'Image uploaded successfully'})
    else:
        return jsonify({'error': 'Invalid file format'})
