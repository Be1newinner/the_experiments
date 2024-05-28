import { Schema, model } from "mongoose";
import { genSalt, hash as _hash } from "bcrypt";

const userSchema = new Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verificationCode: { type: String, default: null },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = await genSalt(10);
  const hash = await _hash(user.password, salt);
  user.password = hash;
  next();
});

export const User = model("User", userSchema);
