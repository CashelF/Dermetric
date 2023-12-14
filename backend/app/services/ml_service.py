import pickle
import tensorflow as tf
    
IMG_WIDTH = 224
IMG_HEIGHT = 224

class MLService:
    def __init__(self):
        self.img_width = 224
        self.img_height = 224
        self.model = tf.keras.models.load_model('app/static/serialized_models/dermavision_model_attempt_1')
        # with open('app/static/serialized_models/dermavision_model_attempt_1.pkl', 'rb') as file:
        #     self.model = pickle.load(file)

    def process_image(self, img_path):
        image = tf.io.read_file(img_path)
        image = tf.image.decode_jpeg(image, channels=3)
        image = tf.image.convert_image_dtype(image, tf.float32)
        image = tf.image.resize(image, size=[IMG_WIDTH, IMG_HEIGHT])
        image = tf.expand_dims(image, 0)
        return image
    
    def unbatchify(self, data):
        images = []
        labels = []
        for image, label in data.unbatch().as_numpy_iterator():
            images.append(image)
            labels.append(label)
        return images, labels

    def predict(self, image_path):
        try:
            processed_image = self.process_image(image_path)
            prediction = self.model.predict(processed_image)
            # label_values = self.unbatchify(prediction)[1]
            return prediction[0].tolist()

        except Exception as e:
            return e
