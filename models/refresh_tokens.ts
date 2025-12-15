import mongoose, { Schema } from "mongoose";

const refreshTokenSchema = new Schema({
  user_id: Schema.ObjectId,
  refresh_token: String,
  expires_in: {
    type: Date,
    default: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  },
});

export default mongoose.models.refresh_token ||
  mongoose.model("refresh_token", refreshTokenSchema);
