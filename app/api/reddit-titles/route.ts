import { connectDB } from "@/lib/mongoose";
import { getStructuredJson, listOfIdeas } from "@/utils/deepseek";
import { iteratePosts } from "@/utils/reddit";
import { NextRequest, NextResponse } from "next/server";
import Idea from "@/models/ideas";

type idea = {
  title: string;
  descriptoin: string;
  feasibility: string;
  targetAudience: string;
};

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

const saveIdea = async (ideas: idea[]) => {
  try {
    for (const idea of ideas) {
      const newIdea = new Idea({
        ...idea,
        created_at: new Date(),
      });
      const createdNewIdea = newIdea.save();
      console.log("New Idea");
      console.log(createdNewIdea);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const subreddit = searchParams.get("subreddit");
    const time = searchParams.get("time");
    const message = searchParams.get("message");
    if (!message) {
      throw new Error("message can't be null");
    }
    const id = searchParams.get("id");
    if (!id) {
      throw new Error("user_id can't be null");
    }
    const posts = await getPosts(subreddit, time);
    console.info("Posts");
    console.info(posts);
    const cleanedPosts = await iteratePosts(posts);
    console.info("ClenedPosts");
    console.info(cleanedPosts);
    const structuredProblemJson = await getStructuredJson(cleanedPosts);
    console.info("StructuredProblemJson");
    console.info(structuredProblemJson);
    const ideas = await listOfIdeas(structuredProblemJson, message);
    console.info("Ideas");
    console.info(ideas);
    await saveIdea(ideas.ideas);
    return NextResponse.json(ideas, { status: 200 });
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return NextResponse.json(e?.message, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "Internal Server Error: Failed to process ideas." },
        { status: 500 }
      );
    }
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const status = searchParams.get("status");

    await Idea.findByIdAndUpdate(
      id,
      {
        is_bookmarked: status === "on" ? true : false,
      },
      {
        new: true,
      }
    );
    return NextResponse.json({
      message: status === "on" ? "idea bookmarked" : "removed bookmark",
      status: 204,
    });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      return NextResponse.json({ message: e.message, status: 500 });
    } else {
      console.log("some");
      return NextResponse.json({
        message: "Some error occured when bookmarking",
        status: 500,
      });
    }
  }
}
