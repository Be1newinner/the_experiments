require("dotenv").config();
const express = require("express");
const path = require("path");
const initiate_payment = require("./functions/UtilCall.js").initiate_payment;
const verifyHash = require("./functions/GenerateHash.js").verifyHash;
const app = express();

app.use(express.urlencoded());
app.use("/static", express.static(path.join(__dirname, "assets")));
app.use("/view", express.static(path.join(__dirname, "views")));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

const config = {
  key: process.env.EASEBUZZ_KEY,
  salt: process.env.EASEBUZZ_SALT,
  env: process.env.EASEBUZZ_ENV,
  enable_iframe: process.env.EASEBUZZ_IFRAME,
};

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

//response
app.post("/response", function (req, res) {
  if (verifyHash(req.body, req.body.hash)) {
    res.send(req.body);
  }
  res.send("false, check the hash value ");
});

//initiate_payment API
app.post("/initiate_payment", async function (req, res) {
  try {
    const data = await req.body;
    initiate_payment(data, config, res);
    res.send("ok");
    res.end();
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Transcation API
app.post("/transaction", function (req, res) {
  data = req.body;
  const transaction = require("./Easebuzz/transaction.js");
  transaction.transaction(data, config, res);
});

//Transcation Date API
app.post("/transaction_date", function (req, res) {
  data = req.body;
  var transaction_date = require("./Easebuzz/tranaction_date.js");
  transaction_date.tranaction_date(data, config, res);
});

//Payout API
app.post("/payout", function (req, res) {
  data = req.body;
  var payout = require("./Easebuzz/payout.js");
  payout.payout(data, config, res);
});

//Refund API
app.post("/refund", function (req, res) {
  data = req.body;
  var refund = require("./Easebuzz/refund.js");
  refund.refund(data, config, res);
});
const PORT = 3001;
app.listen(PORT);
console.log("Easebuzz Payment Kit Demo server started at ", PORT);
