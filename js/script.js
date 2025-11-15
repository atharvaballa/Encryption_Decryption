const API_URL = "https://encryption-decryption-5ffi.onrender.com"; // your backend URL

/* ---------------------------
   Toast Notification
----------------------------*/
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

/* ---------------------------
   Copy to Clipboard
----------------------------*/
function copyText(value, label) {
    navigator.clipboard.writeText(value);
    showToast(`${label} copied`);
}

/* ---------------------------
        ENCRYPT
----------------------------*/
let lastEncryptionOutput = "";   // store for download

function encrypt() {
    const plaintext = document.getElementById("plaintext").value;

    fetch(`${API_URL}/encrypt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plaintext })
    })
    .then(res => res.json())
    .then(data => {
        const out = document.getElementById("encryptOutput");

        out.innerHTML = `
            <div class="output-field">
                <label>Ciphertext</label>
                <pre>${data.ciphertext}</pre>
                <button class="copy-btn" onclick="copyText('${data.ciphertext}', 'Ciphertext')">Copy</button>
            </div>

            <div class="output-field">
                <label>Tag</label>
                <pre>${data.tag}</pre>
                <button class="copy-btn" onclick="copyText('${data.tag}', 'Tag')">Copy</button>
            </div>

            <div class="output-field">
                <label>IV</label>
                <pre>${data.iv}</pre>
                <button class="copy-btn" onclick="copyText('${data.iv}', 'IV')">Copy</button>
            </div>

            <div class="output-field">
                <label>Key</label>
                <pre>${data.key}</pre>
                <button class="copy-btn" onclick="copyText('${data.key}', 'Key')">Copy</button>
            </div>
        `;

        // Save for download
        lastEncryptionOutput = 
`--- AES Encryption Output ---
Ciphertext: ${data.ciphertext}

Tag: ${data.tag}

IV: ${data.iv}

Key: ${data.key}
------------------------------`;
    });
}

/* ---------------------------
       DOWNLOAD ENCRYPTION
----------------------------*/
function downloadEncryption() {
    if (!lastEncryptionOutput) {
        showToast("No encryption output yet");
        return;
    }

    const blob = new Blob([lastEncryptionOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "encryption_output.txt";
    link.click();
    showToast("Encryption output downloaded");
}

/* ---------------------------
        DECRYPT
----------------------------*/
let lastDecryptionOutput = "";

function decrypt() {
    const payload = {
        ciphertext: document.getElementById("ciphertext").value,
        tag: document.getElementById("tag").value,
        iv: document.getElementById("iv").value,
        key: document.getElementById("key").value
    };

    fetch(`${API_URL}/decrypt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        const out = document.getElementById("decryptOutput");

        if (data.error) {
            out.innerHTML = `<span style="color:red">${data.error}</span>`;
            showToast("Decryption failed");
            return;
        }

        out.innerHTML = `
            <div class="output-field">
                <label>Decrypted Text</label>
                <pre>${data.decrypted_text}</pre>
                <button class="copy-btn" onclick="copyText('${data.decrypted_text}', 'Decrypted text')">Copy</button>
            </div>
        `;

        // Save for download
        lastDecryptionOutput = 
`--- AES Decryption Output ---
Decrypted Text:
${data.decrypted_text}
-------------------------------`;

        showToast("Decryption successful");
    });
}

/* ---------------------------
     DOWNLOAD DECRYPTION
----------------------------*/
function downloadDecryption() {
    if (!lastDecryptionOutput) {
        showToast("No decryption output yet");
        return;
    }

    const blob = new Blob([lastDecryptionOutput], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "decryption_output.txt";
    link.click();
    showToast("Decryption output downloaded");
}
