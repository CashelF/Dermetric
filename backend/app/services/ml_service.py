import tensorflow as tf
    
IMG_WIDTH = 224
IMG_HEIGHT = 224

class MLService:
    def __init__(self):
        self.img_width = 224
        self.img_height = 224
        self.model = tf.keras.models.load_model('app/static/serialized_models/dermavision_model_attempt_1')

    def process_image(self, img_path):
        image = tf.io.read_file(img_path)
        image = tf.image.decode_image(image, channels=3, expand_animations=False)
        image = tf.image.convert_image_dtype(image, tf.float32)
        image = tf.image.resize(image, size=[IMG_WIDTH, IMG_HEIGHT])
        image = tf.expand_dims(image, 0)
        return image

    def predict(self, image_path):
        try:
            processed_image = self.process_image(image_path)
            prediction = self.model.predict(processed_image)
            return prediction[0].tolist()

        except Exception as e:
            return e
