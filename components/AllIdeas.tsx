"use client";

import { useState } from "react";
import IdeaCard from "./IdeaCard";
import { PaginationDemo } from "@/components/Pagination";
import { changeBookMardStatus } from "@/lib/bookmark.action";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { dbIdea } from "@/utils/global";
import Search from "./Search";
import Link from "next/link";

const AllIdeas = ({
  ideas,
  count,
  length,
}: {
  ideas: dbIdea[];
  count: number;
  length: number;
}) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState("0");
  const router = useRouter();

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  if (!page) {
    throw new Error("page don't exist");
  }
  console.log("PAGE NUMBER");
  console.log();
  const setBookMarked = async (id: string, to: boolean) => {
    try {
      if (!id) throw new Error("No id was given...");
      setModal(id);
      setLoading(true);
      await changeBookMardStatus(to, id);
      setLoading(false);
      if (to) {
        toast.info("Idea bookmarked successfully!");
      } else {
        toast.info("Bookmard removed successfully");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong!");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 px-6 pb-10 pt-6 lg:px-10 scrollbar-hide overflow-y-auto">
      <Search />
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
        {ideas.length === 0 ? (
          <p className="col-span-full text-center text-muted-foreground">
            No ideas are found,<Link href="/home" className="text-blue-200"> Go create some!</Link>
          </p>
        ) : (
          ideas.map((idea, i) => (
            <div key={i}>
              <IdeaCard
                title={idea.title}
                description={idea.description}
                targetAudience={idea.target_audience}
                feasibility={idea.feasibility}
                isBookmarked={idea.is_bookmarked}
                onSave={async () => {
                  await setBookMarked(idea._id, !idea.is_bookmarked);
                }}
                onDiscuss={() => {
                  router.push("/home");
                }}
                isLoading={modal == idea._id && loading}
              />
            </div>
          ))
        )}
      </div>
      <div className="mt-auto flex justify-center">
        <PaginationDemo length={count} perPage={length} page={page} />
      </div>
    </div>
  );
};

export default AllIdeas;
