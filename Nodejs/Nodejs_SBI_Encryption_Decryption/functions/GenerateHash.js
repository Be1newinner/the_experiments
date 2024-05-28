import sha512 from "js-sha512";

export default function generateHash({
  key,
  txnid,
  amount,
  productinfo,
  name,
  email,
  salt,
}) {
  let hashstring =
    key +
    "|" +
    txnid +
    "|" +
    amount +
    "|" +
    productinfo +
    "|" +
    name +
    "|" +
    email +
    "||||||||||";
  hashstring += "|" + salt;
  return sha512.sha512(hashstring);
}

export function verifyHash(key = "", data = {}, salt = "", providedHash = "") {
  const expectedHash = generateHash(key, data, salt);
  return expectedHash === providedHash;
}
