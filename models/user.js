import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: [isEmail, "invalid email"],
    },
    profilePicture: { type: String, default: "" },
    password: { type: String, required: true },
    id: { type: String },
    newMessages: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      default: "online",
    },
  },
  { minimize: false }
);

export default mongoose.model("User", userSchema);
