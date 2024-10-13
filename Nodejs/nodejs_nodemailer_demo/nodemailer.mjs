const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
      service: "Gmail", // Use the Gmail service
      auth: {
        user: "", // Your Gmail email address
        pass: "", // Your Gmail password or app-specific password
      },
    });

    const mailOptions = {
      from: "teamshipsardevelopers@gmail.com", // Use your Gmail email address here
      to: "be1newinner@gmail.com",
      subject: "Shipsar FORM SUBMISSION",
      text: JSON.stringify(req?.body),
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Email sent successfully." });
    } catch (error) {
      console.error("Error sending email:", error);
      res
        .status(500)
        .json({ error: "An error occurred while sending the email." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed..." });
  }
}
