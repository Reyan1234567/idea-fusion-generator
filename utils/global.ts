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

export const defaultUnknownPerson =
  "https://i.pinimg.com/736x/8a/14/fe/8a14fefc276ab576e8ceac207cace638.jpg";
