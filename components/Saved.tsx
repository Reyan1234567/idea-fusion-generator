"use client";
import { dbIdea } from "@/utils/global";
import { useState } from "react";
import IdeaCard from "./IdeaCard";
import { changeBookMardStatus } from "@/lib/bookmark.action";
import { toast } from "sonner";
import { useRouter } from "next/router";

interface savedI {
  ideas: dbIdea[];
}
const Saved = ({ ideas }: savedI) => {
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
      toast.info("Idea saved successfully!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong!");
    }
  };
  return (
    <div>
      {ideas.map((idea, i) => (
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
      ))}
    </div>
  );
};

export default Saved;
