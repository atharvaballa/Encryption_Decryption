# 📘 **AES Encryption & Decryption Web App**

A modern, user-friendly AES-GCM encryption and decryption tool built with:

* **Frontend:** HTML, CSS, JavaScript (GitHub Pages)
* **Backend:** Python Flask (Render.com API)
* **Crypto:** AES-GCM using PyCryptodome

The application provides encrypted output including Ciphertext, Tag, IV, and Key — and lets users copy or download results easily.

---

## 🚀 **Live Demo**

🔗 **Frontend (GitHub Pages):**
👉 *[https://atharvaballa.github.io/Encryption_Decryption/](https://atharvaballa.github.io/Encryption_Decryption/)*

🔗 **Backend API (Render):**
👉 *[https://encryption-decryption-5ffi.onrender.com/](https://encryption-decryption-5ffi.onrender.com/)*

---

## 🎯 **Features**

### 🔐 **AES-GCM Encryption**

* Encrypt any text instantly
* Generates:

  * Ciphertext
  * Authentication Tag
  * IV (nonce)
  * AES Key (Base64 encoded)

### 🔓 **AES-GCM Decryption**

* Allows users to decrypt using ciphertext + tag + IV + key.

### 📋 **Copy Buttons**

Every output field has a “Copy” button:

* Ciphertext
* Tag
* IV
* Key
* Decrypted text

With smooth **non-blocking toast notifications** (no popup alerts).

### 📥 **Download Output as .txt**

One-click download:

* `encryption_output.txt`
* `decryption_output.txt`

### 🎨 **Clean, Glass UI**

* Modern gradient background
* Glassmorphism cards
* Smooth buttons & animations

---

## 📂 **Project Structure**

```
Encryption_Decryption/
│
├── index.html
├── style.css
│
├── js/
│   └── script.js
│
├── app.py               # Runs only on Render backend (not GitHub Pages)
├── requirements.txt
└── README.md
```

---

## ⚙️ **Technologies Used**

### 🔧 Backend

* Python 3
* Flask
* PyCryptodome (AES-GCM)
* Flask-CORS
* Gunicorn (Render deployment)

### 🎨 Frontend

* HTML5
* CSS3 (glassmorphism UI)
* Vanilla JavaScript
* Fetch API (JSON)

---

## 🛠️ **Installation (Backend Only)**

### 1. Clone the repo

```bash
git clone https://github.com/atharvaballa/Encryption_Decryption
```

### 2. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 3. Run backend locally

```bash
python app.py
```

Backend API will run at:

```
http://127.0.0.1:5000/
```

---

## 🌐 **Deployment**

### 🟦 **Frontend Deployment (GitHub Pages)**

1. Keep these files in repo root:

   * `index.html`
   * `style.css`
   * `js/script.js`
2. Go to:
   **Settings → Pages → Deploy from branch**
3. Select branch: `main`
4. Folder: `/ (root)`
5. Save

Frontend becomes live instantly.

---

### 🟧 **Backend Deployment (Render)**

Backend uses Flask API endpoints.

1. Create a Render Web Service
2. Connect to this repo
3. Set:

   * **Build Command:**

     ```
     pip install -r requirements.txt
     ```
   * **Start Command:**

     ```
     gunicorn app:app
     ```
4. Deploy 🎉
5. Render provides your API URL (example):

   ```
   https://encryption-decryption-5ffi.onrender.com
   ```

This URL is used inside `script.js` as:

```javascript
const API_URL = "https://encryption-decryption-5ffi.onrender.com";
```

---

## 📜 **API Endpoints**

### ▶️ **Encrypt**

```
POST /encrypt
Content-Type: application/json

{
  "plaintext": "Hello"
}
```

### ▶️ **Decrypt**

```
POST /decrypt
Content-Type: application/json

{
  "ciphertext": "...",
  "tag": "...",
  "iv": "...",
  "key": "..."
}
```

---

## 🖼️ **Screenshots**

(Add after you take screenshots)

* ✔ Encryption UI
* ✔ Decryption UI
* ✔ Copy buttons
* ✔ Download .txt

---

## 🤝 **Contributing**

Pull requests are welcome!
Issues, suggestions, or improvements are encouraged.

---

## 📄 **License**

This project is open-source under the **MIT License**.
