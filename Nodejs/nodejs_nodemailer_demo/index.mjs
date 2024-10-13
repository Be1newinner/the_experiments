import nodemailer from "nodemailer";

export default async function handler(res) {
  const req = {};
  req.method = "POST";
  req.body = JSON.stringify({ data: "SOMETHING" });

  if (req.method === "POST") {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: "support@softmindtechnologies.com",
        pass: "Support@1234#",
      },
    });

    const mailOptions = {
      from: "support@softmindtechnologies.com", // Use your Gmail email address here
      to: "be1newinner@gmail.com",
      subject: "Shipsar FORM SUBMISSION",
      text: JSON.stringify(req?.body),
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      //   res.status(200).json({ message: "Email sent successfully." });
    } catch (error) {
      console.error("Error sending email:", error);
      //   res
      //     .status(500)
      //     .json({ error: "An error occurred while sending the email." });
    }
  } else {
    console.log("Method not allowed");
    res.status(405).json({ error: "Method not allowed..." });
  }
}

handler();
