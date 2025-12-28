import { idea } from "@/utils/global";
import * as z from "zod";

export const promptRules = z.object({
  prompt: z.string().min(1, "Prompt is a required field"),
  subreddit: z.string().min(1, "Subreddit is a requried field"),
  numberOfIdeas: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)),
    z
      .number()
      .min(1, "Can't give you ideas less than 1")
      .max(10, "Can't give you ideas more thatn  10")
  ),
});

export type FormState = {
  errors?: {
    prompt?: { errors?: string[] };
    subreddit?: { errors?: string[] };
    numberOfIdeas?: { errors?: string[] };
  };
  message?: string;
  raw?: {
    prompt?: string;
    subreddit?: string;
    numberOfIdeas?: string;
  };
  error?: string;
  success?: boolean;
};
