"use client";
import { dbIdea } from "@/utils/global";
import { useState } from "react";
import IdeaCard from "./IdeaCard";
import { changeBookMardStatus } from "@/lib/bookmark.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Saved = ({ ideas }: { ideas: dbIdea[] }) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState("0");
  const router = useRouter();
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
    <div className="w-full p-10 justify-center overflow-y-auto max-h-screen scrollbar-hide grid grid-cols-1 xl:grid-cols-2 gap-4 relative">
      {ideas.length !== 0 ? (
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
      ) : (
        <div className="w-full justify-center items-center">
          <p className="text-muted-foreground text-2xl">
            Saved Ideas Will Appear Here
          </p>
        </div>
      )}
    </div>
  );
};

export default Saved;
