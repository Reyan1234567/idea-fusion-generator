import { defaultUnknownPerson } from "@/utils/global";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String },
  is_profile_photo_overridden: { type: Boolean, default: false },
  profile_photo: {
    type: String,
    default: defaultUnknownPerson,
  },
  created_at: { type: Date, default: new Date() },
  last_login: { type: Date, default: new Date() },
  is_verified: { type: Boolean, default: false },
  full_name: { type: String },
  password: { type: String },
  is_fullname_overridden: { type: Boolean, default: false },
});

export default mongoose.models.user || mongoose.model("user", userSchema);
