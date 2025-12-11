import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: String,
  is_profile_photo_overridden: Boolean,
  profile_photo: String,
  created_at: Date,
  last_login: Date,
  is_verified: { type: Boolean, default: false },
  full_name: String,
  is_fullname_overridden: Boolean,
});

export default mongoose.model("user", userSchema);
