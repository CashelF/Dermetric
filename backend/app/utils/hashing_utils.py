from argon2 import PasswordHasher

ph = PasswordHasher()

def hash_password(password):
    return ph.hash(password)

def verify_password(hashed_password, provided_password):
    return ph.verify(hashed_password, provided_password)
