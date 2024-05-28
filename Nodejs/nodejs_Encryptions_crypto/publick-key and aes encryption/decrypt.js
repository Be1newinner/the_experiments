import fs from "fs";
import crypto from "crypto";

const privateKey = fs.readFileSync("./private.key", "utf-8");
const OutputData = fs.readFileSync("./output.json", "utf-8");

export default function main() {
  let { encData, key, iv, encToken } = JSON.parse(OutputData);

  if (encToken && privateKey) {
    const decryption = crypto.privateDecrypt(
      privateKey,
      Buffer.from(encToken, "base64")
    );

    [iv, key] = decryption.toString("utf-8").split("|");
  }

  const algorithm = "aes-256-cbc";
  const keyBytes = Buffer.from(key, "base64");
  const ivBytes = Buffer.from(iv, "hex");
  const decipher = crypto.createDecipheriv(algorithm, keyBytes, ivBytes);
  let decrypted = decipher.update(encData, "base64");
  decrypted += decipher.final();
  fs.writeFileSync("output-decrypted.json", JSON.stringify(decrypted));
  console.log(decrypted);
}

main();
