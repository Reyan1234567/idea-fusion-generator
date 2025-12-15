import { NextRequest, NextResponse } from "next/server";
import Chat from "@/models/chat";

//where the chat history gets saved in an already created chat document
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const searchParams = request.nextUrl.searchParams;
  const role = searchParams.get("role");
  const message = searchParams.get("message");
  if (!message) {
    throw new Error("message can't be null");
  }
  try {
    const editChat = await Chat.findByIdAndUpdate(
      id,
      {
        $push: {
          messages: {
            message,
            role,
          },
        },
      },
      { new: true }
    );
    return editChat;
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Couldn't add message", status: 500 });
  }
}
