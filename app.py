from flask import Flask, request, jsonify
from flask_cors import CORS
from Cryptodome.Cipher import AES
from Cryptodome.Random import get_random_bytes
import base64

app = Flask(__name__)
CORS(app)  # allow GitHub Pages → Render API

def aes_encrypt(plaintext, key):
    cipher = AES.new(key, AES.MODE_GCM)
    ciphertext, tag = cipher.encrypt_and_digest(plaintext.encode())
    return {
        "ciphertext": base64.b64encode(ciphertext).decode(),
        "tag": base64.b64encode(tag).decode(),
        "iv": base64.b64encode(cipher.nonce).decode()
    }

def aes_decrypt(ciphertext, tag, iv, key):
    cipher = AES.new(key, AES.MODE_GCM, nonce=base64.b64decode(iv))
    decrypted = cipher.decrypt_and_verify(
        base64.b64decode(ciphertext),
        base64.b64decode(tag)
    )
    return decrypted.decode()

@app.route("/")
def home():
    return jsonify({"message": "AES Encryption API running"})


@app.route("/encrypt", methods=["POST"])
def encrypt():
    data = request.get_json()
    plaintext = data.get("plaintext")

    if not plaintext:
        return jsonify({"error": "No plaintext provided"}), 400

    key = get_random_bytes(16)
    result = aes_encrypt(plaintext, key)
    result["key"] = base64.b64encode(key).decode()

    return jsonify(result)


@app.route("/decrypt", methods=["POST"])
def decrypt():
    data = request.get_json()

    required_fields = ["ciphertext", "tag", "iv", "key"]
    if not all(f in data for f in required_fields):
        return jsonify({"error": "Missing fields"}), 400

    try:
        decrypted_text = aes_decrypt(
            data["ciphertext"],
            data["tag"],
            data["iv"],
            base64.b64decode(data["key"])
        )
        return jsonify({"decrypted_text": decrypted_text})

    except Exception:
        return jsonify({"error": "Decryption failed"}), 400


if __name__ == "__main__":
    app.run()
