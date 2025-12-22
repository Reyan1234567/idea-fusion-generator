import Saved from "@/components/Saved";
import { connectDB } from "@/lib/mongoose";
import Ideas from "@/models/ideas";
import { cookies } from "next/headers";
import Navbar from "@/components/Navbar";
import AllIdeas from "@/components/AllIdeas";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ length: string; page: string }>;
}) => {
  await connectDB();
  const userId = (await cookies()).get("user_id");
  const thePage = Number((await searchParams).page) ?? 1;
  const pageLength = Number((await searchParams).length) ?? 10;
  const query = {
    user_id: userId?.value,
    is_bookmarked: true,
  };
  const getMySavedIdeas = await Ideas.find(query)
    .skip((thePage - 1) * pageLength)
    .limit(pageLength)
    .lean();

  const count = await Ideas.countDocuments(query);

  return (
    <div>
      <Navbar text={"Your saved ideas here"} />
      <AllIdeas ideas={getMySavedIdeas} count={count} length={pageLength} />
    </div>
  );
};

export default page;
