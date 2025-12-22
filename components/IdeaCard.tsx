"use client";

import { useTransition } from "react";
import { Bookmark, BookmarkX, Loader, MoveRight, Star } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface IdeaCardProps {
  title: string;
  description: string;
  targetAudience: string;
  feasibility: string;
  isBookmarked: boolean;
  isLoading: boolean;
  // saveLabel?: string;
  // discussLabel?: string;
  onSave?: () => Promise<void>;
  onDiscuss?: () => void;
  variant?: "gradient" | "glass";
}

export default function IdeaCard({
  title,
  description,
  isBookmarked,
  onDiscuss,
  isLoading,
  onSave,
  feasibility,
  targetAudience,
  variant = "glass",
}: IdeaCardProps) {
  const [isPending, startTransition] = useTransition();

  const stars = Array.from(
    { length: Number(feasibility.split("/")[0]) },
    (_, i) => i
  );

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>
            <p className="text-2xl">{title}</p>
          </CardTitle>
          <CardDescription className="max-h-sm">
            {
              <p>
                {description.length > 200
                  ? description.slice(0, 200) + "..."
                  : description + "..."}
              </p>
            }
          </CardDescription>
          <CardAction>
            <Button onClick={onSave} variant="outline">
              {isLoading ? (
                <Loader />
              ) : !isBookmarked ? (
                <Bookmark
                  className={`w-8 h-8 ${isPending ? "fill-white" : ""}`}
                  strokeWidth={1.5}
                />
              ) : (
                <BookmarkX
                  className={`w-8 h-8 ${isPending ? "fill-white" : ""}`}
                  strokeWidth={1.5}
                />
              )}
            </Button>
          </CardAction>
        </CardHeader>
        <CardFooter>
          <div className="flex justify-between mt-4 w-full items-center">
            <div>
              <p className="flex flex-column items-center">
                {stars.map((_, i) => (
                  <Star key={i} size={20} className="mr-1" />
                ))}{" "}
                {feasibility.split(" ")[0]}
              </p>
              <p className="mt-3 text-sm text-muted-foreground pr-5">
                For:{" "}
                {targetAudience.length > 60
                  ? targetAudience.slice(0, 60) + "..."
                  : targetAudience + "..."}
              </p>
            </div>

            <Button onClick={onDiscuss} className="">
              Discuss
              <MoveRight className="w-6 h-6" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
