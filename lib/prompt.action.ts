"use server";
import { connectDB } from "@/lib/mongoose";
import { FormState, promptRules } from "@/Schemas/prompt";
import { getStructuredJson, listOfIdeas } from "@/utils/deepseek";
import { saveIdeas } from "@/utils/ideas";
import { iteratePosts } from "@/utils/reddit";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function getIdeas(
  _: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    await connectDB();
    const fields = {
      prompt: formData.get("prompt") as string,
      subreddit: formData.get("subreddit") as string,
      numberOfIdeas: formData.get("numberOfIdeas") as string,
    };
    console.log(fields);

    const result = promptRules.safeParse(fields);
    if (!result.success) {
      return {
        errors: z.treeifyError(result.error).properties,
        success: false,
        raw: fields,
      };
    }
    const subreddit = fields.subreddit;
    const numberOfIdeas = fields.numberOfIdeas;
    const message = fields.prompt;
    const posts = await getPosts(subreddit, "7");
    console.log("posts");
    console.log(posts);
    if (!posts) {
      return {
        error: "No posts found",
        success: false,
      };
    }
    const cleanedPosts = await iteratePosts(posts);
    console.info("ClenedPosts");
    console.info(cleanedPosts);
    const structuredProblemJson = await getStructuredJson(cleanedPosts);
    console.info("StructuredProblemJson");
    console.info(structuredProblemJson);
    const ideas = await listOfIdeas(structuredProblemJson, message);
    console.info("Ideas");
    console.info(ideas);
    const res = await saveIdeas(ideas.ideas);
    redirect(`home/${res[0].id}`);
    return {
      message: "successfully created...",
      success: true,
    };
  } catch (e) {
    console.error(e);
    if (isRedirectError(e)) {
      throw e;
    }
    return {
      success: false,
      error: e instanceof Error ? e.message : "Something went wrong!",
    };
  }
}

const getPosts = async (subreddit: string | null, time: string | null) => {
  try {
    console.debug("subreddit: ", subreddit);
    if (!subreddit) throw new Error("Subreddit is a required field");
    const res = await fetch(
      `https://www.reddit.com/r/${subreddit}/top.json?limit=5&t=${time ?? 7}`
    );
    return res.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
};
