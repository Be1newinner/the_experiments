export default async function VerifyEmailController({ User, req, res }) {
  const { email, verificationCode } = req.body;

  try {
    const user = await User.findOne({ email, verificationCode });

    if (!user) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // Update the user's verified status and clear the verification code
    user.verified = true;
    user.verificationCode = null;
    await user.save();

    console.log("User verified successfully.");
    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).send("An error occurred during verification");
  }
}
