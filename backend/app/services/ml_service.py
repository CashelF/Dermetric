import tensorflow as tf
import numpy as np
from PIL import Image

class MLService:
    def __init__(self):
        self.img_width = 224
        self.img_height = 224
        self.model = tf.keras.models.load_model('app/static/serialized_models/dermetric_model_attempt_1')

    def process_image(self, image_file):
        image = Image.open(image_file).convert('RGB') # convert to RGB for consistency, pngs have transparency channel
        image = image.resize((self.img_width, self.img_height))
        image_array = np.array(image)
        image_array = tf.convert_to_tensor(image_array, dtype=tf.float32)
        image_array = tf.expand_dims(image_array, 0)
        return image_array

    def predict(self, image_file):
        try:
            processed_image = self.process_image(image_file)
            prediction = self.model.predict(processed_image)
            labels = ['AK', 'BCC', 'BKL', 'DF', 'MEL', 'NV', 'SCC', 'VASC']
            prediction_dict = dict(zip(labels, prediction[0].tolist()))
            return prediction_dict
        except Exception as e:
            return str(e)
