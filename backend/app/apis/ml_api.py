from flask import Blueprint, request, jsonify
import pickle
import tensorflow as tf

ml_bp = Blueprint('ml_bp', __name__)
IMG_WIDTH = 224
IMG_HEIGHT = 224

with open('dermavision_model_attempt_1.pkl', 'rb') as file:
    model = pickle.load(file)

def process_image(img_path):
    image = tf.io.read_file(img_path)
    image = tf.image.decode_jpeg(image, channels=3)
    image = tf.image.convert_image_dtype(image, tf.float32)
    image = tf.image.resize(image, size=[IMG_WIDTH, IMG_HEIGHT])
    return image

@ml_bp.route('/predict', methods=['POST'])
def predict():
    try:
        image_file = request.files['image']
        temp_path = 'temp.jpg'
        image_file.save(temp_path)
        processed_image = process_image(temp_path)
        prediction = model.predict(processed_image)
        return jsonify({'prediction': prediction})

    except Exception as e:
        return jsonify({'error': str(e)})
