import AllIdeas from "@/components/AllIdeas";
import { connectDB } from "@/lib/mongoose";
import Ideas from "@/models/ideas";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; length: string; search?: string }>;
}) => {
  await connectDB();
  const userId = (await cookies()).get("user_id");
  const thePage = Number((await searchParams).page) || 1;
  const pageLength = Number((await searchParams).length) || 10;
  const search = (await searchParams).search;
  const query = search
    ? {
        user_id: userId?.value,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { target_audience: { $regex: search, $options: "i" } },
        ],
      }
    : { user_id: userId?.value };

  const getMyIdeas = await Ideas.find(query)
    .skip((thePage - 1) * pageLength)
    .sort({ created_at: -1 })
    .limit(pageLength)
    .lean();
  const count = await Ideas.countDocuments(query);
  const titles = [
    "Here is you list of ideas",
    "Find and discuss on some gems",
    "Check projects you might have missed",
    "Brainstorm some ideas you skipped on",
    "The next big thing could be hiding here...",
  ];
  return (
    <div>
      <Navbar text={titles[Math.floor(Math.random() * titles.length)]} />
      <AllIdeas ideas={getMyIdeas} count={count} length={pageLength} />
    </div>
  );
};

export default page;
