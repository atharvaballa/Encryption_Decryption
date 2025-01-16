AES Encryption & Decryption Web App
This web application allows users to encrypt and decrypt data using the AES-GCM encryption algorithm. The app is built using Python's Flask framework for the backend and HTML/CSS/JavaScript for the frontend. It demonstrates how to use AES encryption with initialization vectors (IV) and authentication tags for secure data transmission.

Features:
AES-GCM encryption for confidentiality and integrity.
Encryption of user input with the generated IV and tag.
Decryption of ciphertext using the IV and tag.
Easy-to-use web interface for encryption and decryption operations.

How To Use The Web App
Encryption:
  Enter the text you want to encrypt in the "Enter Text to Encrypt" box.
  Click the Encrypt button.
  The Ciphertext, IV (Initialization Vector), and Tag will be displayed in the respective sections.
  
Decryption:
  Copy the Ciphertext, IV, and Tag from the encryption output.
  Paste these values into the Decryption section.
  Click the Decrypt button to get the original Plaintext back.
  
Important Information:
Tag: Ensures the authenticity and integrity of the ciphertext, preventing tampering.
IV (Initialization Vector): Provides randomness to ensure the same plaintext produces different ciphertexts each time.
Key: A secret cryptographic value used to encrypt and decrypt data, ensuring confidentiality.
