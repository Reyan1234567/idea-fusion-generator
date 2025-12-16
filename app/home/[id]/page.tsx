import { ModeToggle } from "@/components/ModeToggle";
import Ideas from "@/models/ideas";
import Prompt from "@/components/Prompt";
import { connectDB } from "@/lib/mongoose";

const page = async ({ params }: { params: { id: string } }) => {
  await connectDB();
  const { id } = await params;
  const ideas = await Ideas.find({ idea_group: id }).lean();
  console.log("IDEAS");
  console.log(ideas);
  return (
    <div className="h-full w-full flex flex-col  items-center">
      <div className="absolute right-5 top-5">
        <ModeToggle />
      </div>
      <Prompt isNew={false} ideas={ideas} />
    </div>
  );
};

export default page;
