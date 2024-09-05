import mongoose, { Schema, Document } from "mongoose";

interface UserType extends Document {
  name: string;
  email: string;
  password: string | null;
}

const UserSchema = new Schema<UserType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

const User =
  mongoose.models.User || mongoose.model<UserType>("User", UserSchema);

export default User;
