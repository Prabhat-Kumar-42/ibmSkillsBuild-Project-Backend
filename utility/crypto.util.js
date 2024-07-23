const crypto = require("crypto");

//--------------- TODO:have to add the value of these 3 in env file --------------------
const encryptionKey = crypto.randomBytes(32); // Replace with your own secure key
const iv = crypto.randomBytes(16); // Initialization vector for AES
const algorithm = "aes-256-cbc";
//----------------------------------------------------------------------------------
//
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, encryptionKey, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

// Example Use
// const plaintext = "Hello, world!";
// const encryptedData = encrypt(plaintext);
// console.log("Encrypted:", encryptedData);
//
// const decryptedData = decrypt(encryptedData);
// console.log("Decrypted:", decryptedData);
//
module.exports = {
  encrypt,
  decrypt,
};
