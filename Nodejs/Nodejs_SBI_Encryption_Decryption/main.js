import express from "express";
// import GenerateHash, { verifyHash } from "./functions/GenerateHash.js";
// import EaseBuzzPay from "./functions/easebuzz-pay.js";
import fs from "fs";
import crypto from "crypto";

const app = express();
const PORT = 5002;
app.use(express.json());

const publicKey = fs.readFileSync("./pub_key.pem", "utf-8");

// app.post("/hash", (req, res) => {
//   let salt = "";
//   let key = "";
//   let data = {};
//   if (req?.body) {
//     key = req.body.key;
//     salt = req.body.salt;
//     data = req.body.data;
//   }

//   if (key && data && salt) {
//     const hash = GenerateHash(key, data, salt);
//     res.send(hash);
//     res.end();
//   } else {
//     res.send("Invalid Parameters Passed");
//     res.end();
//   }
// });

// app.post("/easebuzz-pay", async (req, res) => {
//   EaseBuzzPay(req.body.salt, req.body.key, req.body.data, res);
// });
// app.post("/easebuzz-pay/response", async (req, res) => {
//   res.send("transaction id => ", req.query.txnid);
//   res.end();
// });

// app.post("/verify-hash", (req, res) => {
//   let salt = "";
//   let key = "";
//   let data = {};
//   let hash = "";
//   if (req?.body) {
//     key = req.body.key;
//     salt = req.body.salt;
//     data = req.body.data;
//     hash = req.body.hash;
//   }

//   console.log({ key, salt, data, hash });
//   if (key && data && salt && hash) {
//     const hashed = verifyHash(key, data, salt, hash);
//     res.send(hashed);
//     res.end();
//   } else {
//     res.send("Invalid Parameters Passed");
//     res.end();
//   }
// });

//////////////////////////////// SBI ENCRYPTION  /////////////////////////////////////

app.post("/sbi-encryption", (req, res) => {
  // const key = Buffer.from(
  //   "xEvMuGYxWtBzoHCG13wWDaDZP3mtaWxPVgbErg2bOjs=",
  //   "base64"
  // );

  const { data } = req.body;

  const { encryptedData, key, iv } = encryptData(data);

  const encToken = encryptWithPublicKey(iv + "|" + key).toString("base64");

  const apiRequest = {
    encData: encryptedData,
    encToken,
    key: key.toString("base64"),
    iv: iv.toString("hex"),
  };

  res.json(apiRequest);
  res.end();
});

app.post("/sbi-decryption", (req, res) => {
  const encData = req.body.encData;
  const key = req.body.key;
  const iv = req.body.iv;

  const data = decryptData(encData, key, iv);

  res.json({ data });
  res.end();
});

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

const decryptData = (encryptedData, key, iv) => {
  const algorithm = "aes-256-cbc";
  const keyBytes = Buffer.from(key, "base64");
  const ivBytes = Buffer.from(iv, "hex");

  const decipher = crypto.createDecipheriv(algorithm, keyBytes, ivBytes);
  let decrypted = decipher.update(encryptedData, "base64");
  decrypted += decipher.final();

  return decrypted;
};

app.listen(PORT, () => {
  console.log("App is listening on " + PORT);
});
