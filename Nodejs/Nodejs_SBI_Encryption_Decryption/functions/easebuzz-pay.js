import generateHash from "./GenerateHash.js";
import { getURLFromHash } from "./GetURLFromHash.js";

const EaseBuzzPay = async (salt, key, data = {}, res) => {
  if (key && data && salt) {
    const date = Date.now();
    data.txnid = "ck" + date + "" + data.phone;
    data.amount = "1600.0";
    data.productinfo = "Credit-Refine";
    data.surl =
      "http://localhost:5002/easebuzz-pay/response?txnid=" + data.txnid;
    data.furl =
      "http://localhost:5002/easebuzz-pay/response?txnid=" + data.txnid;
    data.firstname = data.firstname.trim().split(" ")[0];

    const hash = generateHash({
      key,
      txnid: data.txnid,
      amount: data.amount,
      productinfo: data.productinfo,
      name: data.firstname,
      email: data.email,
      salt,
    });
    const response = await getURLFromHash({
      key,
      txnid: data.txnid,
      amount: data.amount,
      productinfo: data.productinfo,
      firstname: data.firstname,
      phone: data.phone,
      email: data.email,
      surl: data.surl,
      furl: data.furl,
      hashed: hash,
    });
    console.log({ response });
    const resData = await response.data;
    const resStatus = await response.status;
    if (resStatus === 1) {
      res.send({
        error: null,
        status: 200,
        data: "https://pay.easebuzz.in/v2/pay/" + resData,
      });
    } else {
      res.send({
        error: "Unknown Error!",
        status: 404,
        data: null,
      });
    }
  } else {
    res.send({
      error: "Invalid Parameters Passed",
      status: 404,
      data: null,
    });
  }
  res.end();
};

export default EaseBuzzPay;
