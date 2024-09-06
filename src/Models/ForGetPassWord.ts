import mongoose, { Schema, Document } from "mongoose";
interface ForGetPassWordinstces extends Document {
  active: boolean;
  user: mongoose.Schema.Types.ObjectId;
}

const ForGetPassWrordSchema = new Schema<ForGetPassWordinstces>({
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const ForGetPassWord =
  mongoose.models.ForGetPassWord ||
  mongoose.model<ForGetPassWordinstces>(
    "ForGetPassWord",
    ForGetPassWrordSchema
  );

export default ForGetPassWord;
