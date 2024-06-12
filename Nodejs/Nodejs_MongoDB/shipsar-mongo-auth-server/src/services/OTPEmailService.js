"use strict";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "", // Your Gmail email address
    pass: "", // Your Gmail password
  },
});

async function OTPEmailService(email, otp, website = "Shipsar.in") {
  try {
    if (!email) return;
    if (otp.length !== 6) return;
    const info = await transporter.sendMail({
      from: '"Shipsar Auth Service" <aeronamyrai@gmail.com>', // sender address
      to: email, // list of receivers (comma-separated if multiple)
      subject: "OTP to Verify email at " + website, // Subject line
      text: "Good Day! Friend.", // plain text body
      html: `<b>Good Day! Friend.
        We have requested a Sign UP from email Id ${email} .
      OTP to Verify your email for website ${website} is <h3>${otp}</h3> </b><br><h3>Message from <a alt='shipsar.in' href='https://shipsar.in'>Shipsar.in</a></h3>`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export default OTPEmailService;
