"use server";

import { cookies } from "next/headers";
import Ideas from "@/models/ideas";
import { connectDB } from "./mongoose";

export const getAllIdeas = async () => {
  try {
    await connectDB();
    const userId = (await cookies()).get("user_id")?.value;
    if (!userId) throw new Error("User not authenticated");

    const ideas = await Ideas.find({ user_id: userId }).lean().sort({
      created_at: -1,
    });
    return ideas.map((idea) => ({
      _id: idea._id.toString(),
      title: idea.title,
      description: idea.description,
      target_audience: idea.target_audience,
      feasibility: idea.feasibility,
      is_bookmarked: idea.is_bookmarked,
      idea_group: idea.idea_group,
      created_at: idea.created_at.toISOString(),
    }));
  } catch (e) {
    console.log("Error fetching ideas:", e);
    throw new Error("Failed to fetch ideas");
  }
};
