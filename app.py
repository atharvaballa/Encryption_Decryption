from flask import Flask, render_template, request, redirect, url_for
from Cryptodome.Cipher import AES
from Cryptodome.Random import get_random_bytes
import base64

app = Flask(__name__)

# AES Encryption function
def aes_encrypt(plaintext, key):
    cipher = AES.new(key, AES.MODE_GCM)
    ciphertext, tag = cipher.encrypt_and_digest(plaintext.encode('utf-8'))
    return {
        'ciphertext': base64.b64encode(ciphertext).decode('utf-8'),
        'tag': base64.b64encode(tag).decode('utf-8'),
        'iv': base64.b64encode(cipher.nonce).decode('utf-8')
    }

# AES Decryption function
def aes_decrypt(ciphertext, tag, iv, key):
    cipher = AES.new(key, AES.MODE_GCM, nonce=base64.b64decode(iv))
    decrypted = cipher.decrypt_and_verify(base64.b64decode(ciphertext), base64.b64decode(tag))
    return decrypted.decode('utf-8')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/encrypt', methods=['POST'])
def encrypt():
    plaintext = request.form.get('plaintext')
    
    if not plaintext:
        return redirect(url_for('home', error="Plaintext is required"))
    
    # AES key (128-bit)
    key = get_random_bytes(16)  # 128-bit key
    
    result = aes_encrypt(plaintext, key)
    
    result['key'] = base64.b64encode(key).decode('utf-8')
    
    return render_template('index.html', result=result)

@app.route('/decrypt', methods=['POST'])
def decrypt():
    ciphertext = request.form.get('ciphertext')
    tag = request.form.get('tag')
    iv = request.form.get('iv')
    key = request.form.get('key')

    if not ciphertext or not tag or not iv or not key:
        return redirect(url_for('home', error="Ciphertext, tag, iv, and key are required"))

    # Convert base64 encoded key to bytes
    key = base64.b64decode(key)
    
    try:
        decrypted_text = aes_decrypt(ciphertext, tag, iv, key)
    except ValueError as e:
        return redirect(url_for('home', error="Decryption failed. Possibly due to incorrect key or data."))
    
    return render_template('index.html', decrypted_text=decrypted_text)

if __name__ == '__main__':
    app.run(debug=True)
