"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ArrowUp } from "lucide-react";
import { Input } from "./ui/input";
import { getIdeas } from "@/lib/prompt.action";
import { useActionState, useState } from "react";
import { Button } from "./ui/button";
import { Spinner } from "@/components/ui/spinner";
import IdeaCard from "./IdeaCard";
import { dbIdea } from "@/utils/global";
import { useRouter } from "next/navigation";
import { changeBookMardStatus } from "@/lib/bookmark.action";
import { toast } from "sonner";

interface flick {
  isNew: boolean;
  ideas?: dbIdea[];
}
const Prompt = ({ isNew, ideas }: flick) => {
  const [state, action, isPending] = useActionState(getIdeas, {});
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState("0");

  const handleBookmark = async (to: boolean, id: string) => {
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
    <div className="h-full">
      {!isNew && (
        <div className="w-full p-10 justify-center overflow-y-auto max-h-screen scrollbar-hide grid grid-cols-1 xl:grid-cols-2 gap-4">
          {ideas &&
            ideas.map((message, i) => (
              <div key={i}>
                <IdeaCard
                  title={message.title}
                  description={message.description}
                  onSave={async () => {
                    await handleBookmark(!message.is_bookmarked, message._id);
                  }}
                  onDiscuss={async () => {
                    router.push(`discuss/${message._id}`);
                  }}
                  targetAudience={message.target_audience}
                  feasibility={message.feasibility}
                  isBookmarked={message.is_bookmarked}
                  isLoading={loading && modal == message._id}
                />
              </div>
            ))}
        </div>
      )}
      {isNew && (
        <div className="w-full h-full flex justify-center items-center px-20">
          <form
            className="flex flex-col gap-4 w-full max-w-4xl"
            action={action}
          >
            <InputGroup className="p-2 rounded-xl max-w-4xl">
              <InputGroupTextarea
                required
                name="prompt"
                className="max-h-32 overflow-y-auto min-h-4 scrollbar-hide"
                placeholder="Ask, Search or Chat..."
                defaultValue={state.raw?.prompt}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText className="ml-auto"></InputGroupText>
                <Separator className="!h-4" />
                <InputGroupButton
                  variant="default"
                  className="rounded-full"
                  size="icon-sm"
                >
                  <Button type="submit">
                    {isPending ? <Spinner /> : <ArrowUp />}
                  </Button>
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <div className="flex flex-row gap-4">
              <Input
                required
                type="number"
                name="numberOfIdeas"
                placeholder="Number of product ideas"
                min="1"
                max="10"
                defaultValue={state.raw?.numberOfIdeas}
              />
              <Input
                required
                name="subreddit"
                placeholder="Subreddit"
                min="1"
                max="10"
                defaultValue={state.raw?.subreddit}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Prompt;
