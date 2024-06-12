const sha512 = require("js-sha512");

function generateHash(key = "", data = {}, salt = "") {
  let hashstring =
    key +
    "|" +
    data.txnid +
    "|" +
    data.amount +
    "|" +
    data.productinfo +
    "|" +
    data.firstname +
    "|" +
    data.email +
    "|" +
    data.udf1 +
    "|" +
    data.udf2 +
    "|" +
    data.udf3 +
    "|" +
    data.udf4 +
    "|" +
    data.udf5 +
    "|" +
    data.udf6 +
    "|" +
    data.udf7 +
    "|" +
    data.udf8 +
    "|" +
    data.udf9 +
    "|" +
    data.udf10;

  hashstring += "|" + salt;
  data.hash = sha512.sha512(hashstring);
  return data.hash;
}

function verifyHash(key = "", data = {}, salt = "", hashPassed = "") {
  if (generateHash(key, data, salt) == hashPassed) return true;
  else return false;
}

exports.generateHash = generateHash;
exports.verifyHash = verifyHash;
