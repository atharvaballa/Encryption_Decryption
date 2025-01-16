from flask import Flask, request, jsonify
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes
import os
import base64

app = Flask(__name__)

# AES Key and IV
aes_key = os.urandom(32)  # 256-bit key
aes_iv = os.urandom(12)   # 96-bit IV

# DES Key and IV
des_key = os.urandom(8)   # 64-bit key
des_iv = os.urandom(8)    # 64-bit IV

# RSA Key Pair
rsa_private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048,
)
rsa_public_key = rsa_private_key.public_key()

# AES Encryption/Decryption
def aes_encrypt(plaintext):
    cipher = Cipher(algorithms.AES(aes_key), modes.GCM(aes_iv))
    encryptor = cipher.encryptor()
    ciphertext = encryptor.update(plaintext.encode()) + encryptor.finalize()
    return base64.b64encode(ciphertext).decode(), base64.b64encode(encryptor.tag).decode()

def aes_decrypt(ciphertext, tag):
    cipher = Cipher(algorithms.AES(aes_key), modes.GCM(aes_iv, base64.b64decode(tag)))
    decryptor = cipher.decryptor()
    plaintext = decryptor.update(base64.b64decode(ciphertext)) + decryptor.finalize()
    return plaintext.decode()

# DES Encryption/Decryption
def des_encrypt(plaintext):
    cipher = Cipher(algorithms.TripleDES(des_key), modes.CBC(des_iv))
    encryptor = cipher.encryptor()
    padded_plaintext = plaintext.encode().ljust(8, b'\0')  # Padding
    ciphertext = encryptor.update(padded_plaintext) + encryptor.finalize()
    return base64.b64encode(ciphertext).decode()

def des_decrypt(ciphertext):
    cipher = Cipher(algorithms.TripleDES(des_key), modes.CBC(des_iv))
    decryptor = cipher.decryptor()
    padded_plaintext = decryptor.update(base64.b64decode(ciphertext)) + decryptor.finalize()
    return padded_plaintext.decode().rstrip('\0')

# RSA Encryption/Decryption
def rsa_encrypt(plaintext):
    ciphertext = rsa_public_key.encrypt(
        plaintext.encode(),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return base64.b64encode(ciphertext).decode()

def rsa_decrypt(ciphertext):
    plaintext = rsa_private_key.decrypt(
        base64.b64decode(ciphertext),
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    return plaintext.decode()

@app.route("/encrypt", methods=["POST"])
def encrypt():
    data = request.json
    plaintext = data["plaintext"]
    encryption_type = data["encryption_type"]

    if encryption_type == "AES":
        ciphertext, tag = aes_encrypt(plaintext)
        return jsonify({"ciphertext": ciphertext, "tag": tag})

    elif encryption_type == "DES":
        ciphertext = des_encrypt(plaintext)
        return jsonify({"ciphertext": ciphertext})

    elif encryption_type == "RSA":
        ciphertext = rsa_encrypt(plaintext)
        return jsonify({"ciphertext": ciphertext})

    return jsonify({"error": "Invalid encryption type"}), 400

@app.route("/decrypt", methods=["POST"])
def decrypt():
    data = request.json
    encryption_type = data["encryption_type"]

    if encryption_type == "AES":
        ciphertext = data["ciphertext"]
        tag = data["tag"]
        plaintext = aes_decrypt(ciphertext, tag)
        return jsonify({"plaintext": plaintext})

    elif encryption_type == "DES":
        ciphertext = data["ciphertext"]
        plaintext = des_decrypt(ciphertext)
        return jsonify({"plaintext": plaintext})

    elif encryption_type == "RSA":
        ciphertext = data["ciphertext"]
        plaintext = rsa_decrypt(ciphertext)
        return jsonify({"plaintext": plaintext})

    return jsonify({"error": "Invalid decryption type"}), 400

if __name__ == "__main__":
    app.run(debug=True)
