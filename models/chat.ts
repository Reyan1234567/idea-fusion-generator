import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
  topic: { type: String, required: true },
  messages: [
    {
      role: String,
      message: String,
    },
  ],
  user_id: Schema.ObjectId,
});

export default mongoose.models.chat || mongoose.model("chat", chatSchema);
