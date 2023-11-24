class Config:
    MONGO_URI = 'mongodb://localhost:27017/dermetric_app'
    MONGODB_SETTINGS = {
        'db': 'dermetric_app',
        'host': 'mongodb+srv://dermetric-cluster.ec2avem.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority',
        'port': 27017,
        'authentication_source': '$external',
        'ssl': True,
        'ssl_ca_certs': '/certs/ca.pem',
        'ssl_certfile': '/certs/client.pem',
        'ssl_keyfile': '/certs/ca-key.pem',
    }
    UPLOAD_FOLDER = 'app/static/uploads'
    IMAGES_UPLOAD_FOLDER = 'app/static/uploads/images'