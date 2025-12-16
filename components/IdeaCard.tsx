"use client";

import { useState, useTransition } from "react";
import { Bookmark, BookmarkX, Loader, MoveRight, Star } from "lucide-react";
import { Button } from "./ui/button";

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

  const baseStyles =
    "relative max-w-md w-full p-7 rounded-[40px] flex flex-col gap-6 text-white overflow-hidden m-5";
  const variants = {
    gradient: "bg-gradient-to-br from-[#555] to-[#333] border border-white/10",
    glass: "bg-white/5 backdrop-blur-lg border border-white/10",
  };
  const stars = Array.from(
    { length: Number(feasibility.split("/")[0]) },
    (_, i) => i
  );

  return (
    <div className={`${baseStyles} ${variants[variant]} w-full`}>
      <button
        onClick={onSave}
        disabled={isPending}
        className="absolute top-10 right-10 opacity-70 hover:opacity-100 transition-opacity disabled:animate-pulse"
      >
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
      </button>

      {/* Content Section */}
      <div className="flex flex-col gap-4 pr-12 max-h-40 overflow-y-hidden">
        <h2 className="text-md font-bold tracking-tight">{title}</h2>
        <p className="text-sm leading-relaxed text-gray-300 font-light">
          {description}
        </p>
        <div className=""></div>
      </div>

      <div className="flex justify-between mt-4">
        <div>
          <p className="flex flex-column items-center">
            {stars.map((_, i) => (
              <Star key={i} size={20} className="mr-1" />
            ))}{" "}
            {feasibility.split(" ")[0]}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            For: {targetAudience}
          </p>
        </div>

        <Button
          onClick={onDiscuss}
          className="bg-white/10 hover:bg-white/20 text-white px-8 py-7 rounded-2xl text-xl font-medium flex gap-3 transition-all"
        >
          Discuss
          <MoveRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
