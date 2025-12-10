import { getStructuredJson, listOfIdeas } from "@/utils/deepseek";
import { iteratePosts } from "@/utils/reddit";
import { NextRequest, NextResponse } from "next/server";

// const postUrl = "https://www.reddit.com/r/startups/top.json?limit=10&t=week";
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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const subreddit = searchParams.get("subreddit");
    const time = searchParams.get("time");

    const response = await getPosts(subreddit, time);
    console.log("Response");
    console.log(response);
    const realRes = await iteratePosts(response);
    console.log("RealRes");
    console.log(realRes);
    const realRealRes = await getStructuredJson(realRes);
    console.log("RealRealRes");
    console.log(realRealRes);
    const idea = await listOfIdeas(realRealRes);
    console.log("idea");
    console.log(idea);
    return NextResponse.json(idea, { status: 200 });
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return NextResponse.json(e?.message, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "Some error occured" },
        { status: 500 }
      );
    }
  }
}
