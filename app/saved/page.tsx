import Saved from "@/components/Saved";
import { connectDB } from "@/lib/mongoose";
import Ideas from "@/models/ideas";
import { cookies } from "next/headers";

const page = async () => {
  await connectDB();
  const getSavedIdeas = async () => {
    const userId = (await cookies())!.get("user_id")!.value;
    return await Ideas.find({ is_bookmarked: true, user_id: userId }).lean();
  };
  const savedIdeaArr = await getSavedIdeas();
  return (
    <div>
      <h2>Saved Ideas</h2>
      <div>
        <Saved ideas={savedIdeaArr} />
      </div>
    </div>
  );
};

export default page;
