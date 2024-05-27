const express = require("express");
const { SendSignInOTP } = require("./auths/SendSignInOTP");
const { VerifySignInOTP } = require("./auths/VerifySignInOTP");
const { VerifySignUpOTP } = require("./auths/VerifySignUpOTP");

const app = express();
const PORT = 4522;

app.use(express.json());

app.post("/sign-in-send-otp", async (req, res) => {
  const { phone } = req?.body;
  if (phone?.length != 10) {
    res.send("Invalid Arguments!");
    res.end();
    return;
  }

  const response = await SendSignInOTP({ phone });
  res.send(response);
  res.end();
});

app.post("/sign-in-verify-otp", async (req, res) => {
  const { session, otp, phone } = req?.body;
  if (phone?.length != 10 || !session || otp?.length != 6) {
    res.send("Invalid Arguments!");
    res.end();
    return;
  }

  const response = await VerifySignInOTP({ session, otp, phone });
  res.send(response);
  res.end();
});

app.post("/sign-up-verify-otp", async (req, res) => {
  const { session, otp, phone, name } = req?.body;
  if (phone?.length != 10 || !session || otp?.length != 6) {
    res.send("Invalid Arguments!");
    res.end();
    return;
  }

  const response = await VerifySignUpOTP({ session, otp, phone, name });
  res.send(response);
  res.end();
});

app.listen(PORT, () => {
  console.log("App is listening on Port", PORT);
});
