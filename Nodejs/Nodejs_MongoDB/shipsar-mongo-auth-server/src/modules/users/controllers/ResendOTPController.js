async function ResendOTPController({ User, req, res }) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(200).json({ message: "User doesn't Exist." });
      return;
    }
    if (user?.verified) {
      res
        .status(200)
        .json({ message: "This Email doesn't require Verification." });
      return;
    }

    


    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).send("An error occurred during verification");
  }
}

export default ResendOTPController;
