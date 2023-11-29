import pickle
import tensorflow as tf

IMG_WIDTH = 224
IMG_HEIGHT = 224

with open('app/static/serialized_models/dermavision_model_attempt_1.pkl', 'rb') as file:
    model = pickle.load(file)

def process_image(img_path):
    image = tf.io.read_file(img_path)
    image = tf.image.decode_jpeg(image, channels=3)
    image = tf.image.convert_image_dtype(image, tf.float32)
    image = tf.image.resize(image, size=[IMG_WIDTH, IMG_HEIGHT])
    return image

def predict(image_file):
    try:
        temp_path = 'temp.jpg'
        image_file.save(temp_path)
        processed_image = process_image(temp_path)
        prediction = model.predict(processed_image)
        return prediction

    except Exception as e:
        return e
