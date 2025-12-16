export const BASE_URL = "http://localhost:3000";

export type idea = {
  name: string;
  description: string;
  feasibility: string;
  targetAudience: string;
};
export type dbIdea = {
  _id: string;
  title: string;
  description: string;
  feasibility: string;
  target_audience: string;
  vector_embedding: string;
  is_bookmarked: boolean;
  user_id: string;
  created_at: Date;
  idea_group: string;
};