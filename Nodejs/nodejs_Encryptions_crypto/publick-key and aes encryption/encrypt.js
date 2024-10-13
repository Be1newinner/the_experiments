import fs from "fs";
import crypto from "crypto";

const publicKey = fs.readFileSync("./public_key.pem", "utf-8");

const generateKey = () => {
  const salt = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  // key size here is in bytes not bits so if want 256 bit it would be 32 * 8 => 256
  const key = crypto.pbkdf2Sync("API", salt, 65536, 32, "sha1");
  return { key, iv };
};

const encryptData = (data) => {
  const { key, iv } = generateKey();

  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encryptedData = cipher.update(data, "utf-8", "base64");
  encryptedData += cipher.final("base64");

  return { encryptedData, key, iv };
};

const encryptWithPublicKey = (token) => {
  const encryptedToken = crypto.publicEncrypt(publicKey, Buffer.from(token));
  return encryptedToken;
};

export default function main() {
  const data = "Hi! I am Vijay Kumar";

  const { encryptedData, key, iv } = encryptData(data);

  const encToken = encryptWithPublicKey(
    iv.toString("hex") + "|" + key.toString("base64")
  ).toString("base64");

  const apiRequest = {
    encData: encryptedData,
    encToken,
    iv: iv.toString("hex"),
    key: key.toString("base64"),
  };

  fs.writeFileSync("output.json", JSON.stringify(apiRequest));
  console.log(apiRequest);
}

main();
