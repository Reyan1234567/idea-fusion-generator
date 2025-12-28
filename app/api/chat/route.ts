import { NextRequest, NextResponse } from "next/server";
import Chat from "@/models/chat";

//supposed to create a new chat so the discussion can continue there
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const topic = searchParams.get("topic");
  const userId = searchParams.get("userId");
  try {
    const newChat = new Chat({
      topic,
      messages: [],
      userId,
    });
    const newCreatedChat = newChat.save();
    return NextResponse.json({ message: newCreatedChat, status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Couldn't add message", status: 500 });
  }
}
