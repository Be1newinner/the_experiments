import { compare } from "bcrypt";

const SignInUser = async ({ User, req, res }) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.verified) {
      return res
        .status(401)
        .json({ message: "Please verify your email before logging in" });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({
      message: "Authentication successful",
      user: {
        id: user?._id,
        name: user?.fullName,
        phone: user?.phone,
        email: user?.email,
      },
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "An error occurred during sign-in" });
  }
};

export default SignInUser;
