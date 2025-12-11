import mongoose, { Schema } from "mongoose";

const ideaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  feasibility: {
    type: String,
    required: true,
  },
  target_audience: {
    type: String,
    required: true,
  },
  vector_embedding: {
    type: String,
    default: "before_implementing_the_embedding",
  },
  is_bookmarked: {
    type: Boolean,
    default: false,
  },
  user_id: {
    type: Schema.ObjectId,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("idea", ideaSchema);
