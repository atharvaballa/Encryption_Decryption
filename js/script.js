const API_URL = "https://encryption-decryption-5ffi.onrender.com";

// Copy function
function copyText(value) {
    navigator.clipboard.writeText(value);
    alert("Copied!");
}

// Encrypt function
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
                <button class="copy-btn" onclick="copyText('${data.ciphertext}')">Copy</button>
            </div>

            <div class="output-field">
                <label>Tag</label>
                <pre>${data.tag}</pre>
                <button class="copy-btn" onclick="copyText('${data.tag}')">Copy</button>
            </div>

            <div class="output-field">
                <label>IV</label>
                <pre>${data.iv}</pre>
                <button class="copy-btn" onclick="copyText('${data.iv}')">Copy</button>
            </div>

            <div class="output-field">
                <label>Key</label>
                <pre>${data.key}</pre>
                <button class="copy-btn" onclick="copyText('${data.key}')">Copy</button>
            </div>
        `;
    });
}

// Decrypt function
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
            return;
        }

        out.innerHTML = `
            <div class="output-field">
                <label>Decrypted Text</label>
                <pre>${data.decrypted_text}</pre>
                <button class="copy-btn" onclick="copyText('${data.decrypted_text}')">Copy</button>
            </div>
        `;
    });
}
