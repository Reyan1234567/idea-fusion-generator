"use server";
import Idea from "@/models/ideas";
import { revalidatePath } from "next/cache";
import { connectDB } from "./mongoose";

export const changeBookMardStatus = async (to: boolean, id: string) => {
  try {
    await connectDB();
    if (!id) throw new Error("Crossed Early!");
    const idea = await Idea.findByIdAndUpdate(id, {
      $set: { is_bookmarked: to },
      new: true,
      runValidators: true,
    });
    if (!idea) {
      throw new Error("idea not found!");
    }
    revalidatePath("/home/[id]");
  } catch (e) {
    throw e;
  }
};
