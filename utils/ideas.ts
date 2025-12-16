import Idea from "@/models/ideas";
import { cookies } from "next/headers";
import { idea } from "./global";

export const saveIdeas = async (ideas: idea[]) => {
  const uuid = crypto.randomUUID();
  const res = [];
  const userId = (await cookies()).get("user_id");
  for (const idea of ideas) {
    console.log("Just for the log");
    const newUser = new Idea({
      title: idea.name,
      description: idea.description,
      feasibility: idea.feasibility,
      target_audience: idea.targetAudience,
      user_id: userId?.value,
      idea_group: uuid,
    });
    res.push(await newUser.save());
  }
  return res;
};
