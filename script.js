const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
let aesKey;

async function generateAESKey() {
    aesKey = await window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"]
    );
}

async function encryptText(plainText) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedText = textEncoder.encode(plainText);

    const encryptedBuffer = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        aesKey,
        encodedText
    );

    return {
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encryptedBuffer))
    };
}

async function decryptText(encryptedData) {
    const iv = new Uint8Array(encryptedData.iv);
    const encryptedBuffer = new Uint8Array(encryptedData.data).buffer;

    const decryptedBuffer = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        aesKey,
        encryptedBuffer
    );

    return textDecoder.decode(decryptedBuffer);
}

document.getElementById('encryptBtn').addEventListener('click', async () => {
    const plainText = document.getElementById('plainText').value;
    const encryptedData = await encryptText(plainText);
    document.getElementById('cipherText').value = JSON.stringify(encryptedData);
});

document.getElementById('decryptBtn').addEventListener('click', async () => {
    const encryptedText = document.getElementById('cipherText').value;
    const encryptedData = JSON.parse(encryptedText);
    const decryptedText = await decryptText(encryptedData);
    document.getElementById('decodedText').value = decryptedText;
});

generateAESKey();
