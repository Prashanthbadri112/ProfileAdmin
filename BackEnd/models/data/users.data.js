import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.MONGODB_URL;
mongoose.connect(dbUrl);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    country:{ type: String, required: true}
  }
);

const users = mongoose.model("User", userSchema);

//export default connectDB;

export default users;