import tensorflow as tf
import numpy as np
from PIL import Image
from huggingface_hub import hf_hub_download

def singleton(cls):
    instances = {}

    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

@singleton
class MLService:
    def __init__(self):
        self.img_width = 224
        self.img_height = 224
        model_path = hf_hub_download(
            repo_id="Miguel764/efficientnetv2s-skin-cancer-classifier",
            filename="efficientnetv2s.h5"
        )
        self.model = tf.keras.models.load_model(model_path)

    def process_image(self, image_file):
        image = Image.open(image_file).convert('RGB')
        image = image.resize((self.img_width, self.img_height))
        image_array = np.array(image, dtype=np.float32)
        image_array = image_array / 255.0
        image_array = (image_array - 0.5) * 2
        image_array = tf.expand_dims(image_array, 0)
        return image_array

    def predict(self, image_file):
        try:
            processed_image = self.process_image(image_file)
            prediction = self.model.predict(processed_image)
            labels = ['AKIEC', 'BCC', 'BKL', 'DF', 'MEL', 'NV', 'VASC']
            prediction_dict = dict(zip(labels, prediction[0].tolist()))
            return prediction_dict
        except Exception as e:
            return str(e)
