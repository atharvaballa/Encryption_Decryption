const API_URL = "https://your-render-url.onrender.com";

function encrypt() {
    const plaintext = document.getElementById("plaintext").value;

    fetch(`${API_URL}/encrypt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plaintext })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById("encryptOutput").textContent =
            JSON.stringify(data, null, 4);
    });
}

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
        document.getElementById("decryptOutput").textContent =
            JSON.stringify(data, null, 4);
    });
}
