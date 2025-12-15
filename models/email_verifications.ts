import mongoose, { Schema } from "mongoose";

const emailVerificationSchema = new Schema({
  user_id: Schema.ObjectId,
  secret_code: String,
  expires_in: {
    type: Date,
    default: new Date(Date.now() + 1000 * 60 * 10),
  },
});

export default mongoose.models.email_verification ||
  mongoose.model("email_verification", emailVerificationSchema);
