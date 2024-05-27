import randomize from "randomatic";

import OTPEmailService  from "../../../services/OTPEmailService.js"

const SignUpUser = async ({ User, req, res }) => {
  const { fullName, phone, email, password } = req.body;

  try {
    if (!fullName) {
      res.status(500).send("User Name is invalid");
      return;
    }
    if (!phone) {
      res.status(500).send("phone is invalid");
      return;
    }
    if (!email) {
      res.status(500).send("email is invalid");
      return;
    }
    if (!password) {
      res.status(500).send("password is invalid");
      return;
    }

    const verificationCode = randomize("0", 6);
    console.log("Verification Code:", verificationCode);

    const user = new User({
      fullName,
      phone,
      email,
      password,
      verificationCode,
      verified: false,
    });
    await user.save();

    OTPEmailService(email, verificationCode, "www.shipsar.in");

    console.log("User saved successfully.");
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("An error occurred during registration");
  }
};

export default SignUpUser;
