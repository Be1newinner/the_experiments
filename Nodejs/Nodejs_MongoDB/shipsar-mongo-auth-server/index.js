import dotenv from "dotenv";
import express from "express";
import connectToDatabase from "./config/db.js";
import { User } from "./src/modules/users/models/UserModel.js";
import SignUpUser from "./src/modules/Users/controllers/SignUpController.js";
import SignInUser from "./src/modules/Users/controllers/SignInController.js";
import VerifyEmail from "./src/modules/Users/controllers/VerifyEmailController.js";
import ResendOTPController from "./src/modules/users/controllers/ResendOTPController.js";

dotenv.config();

const app = express();
const PORT = 8131;
app.use(express.json());

app.post("/signup", (req, res) => SignUpUser({ User, req, res }));
app.post("/signin", (req, res) => SignInUser({ User, req, res }));
app.post("/verify", (req, res) => VerifyEmail({ User, req, res }));
app.post("/resend-otp", (req, res) => ResendOTPController({ User, req, res }));

connectToDatabase(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
