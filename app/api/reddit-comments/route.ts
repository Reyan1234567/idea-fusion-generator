import { NextRequest, NextResponse } from "next/server";

// const commentUrl = "https://www.reddit.com/r/startups/comments/1ostbi4/.json";
const getComments = async (subreddit: string | null, postId: string | null) => {
  try {
    if (!subreddit || !postId) {
      throw new Error("Subreddit and PostId are required field");
    }
    const res = await fetch(
      `https://www.reddit.com/r/${subreddit}/comments/${postId}/.json`
    );
    return res.json();
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export async function GET(requet: NextRequest) {
  try {
    const searchParams = requet.nextUrl.searchParams;
    const subreddit = searchParams.get("subreddit");
    const postId = searchParams.get("postId");
    const res = getComments(subreddit, postId);
    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({
      message: "Some error occurend when retrieving some post",
      status: 500,
    });
  }
}
