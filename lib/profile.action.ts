"use server"
import { join } from "path";
import { writeFile } from "node:fs/promises";
import { connectDB } from "./mongoose";
import Users from "@/models/users";

export const getImageUrl = async (img: File | null) => {
  if (!img) {
    throw new Error("no image given");
  }
  const bytes = await img.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join("C:/Users/hp");
  // check if parent path don't exist and if it doesn't then make a new one
  // and create that image there

  //learn how to use the path.join thing...
  // if()
  console.log(path);
  await writeFile(path, buffer);
  return path;
};

export const editUser = async (
  img: File,
  fullName: string,
  username: string,
  id: string
) => {
  connectDB();
  try {
    const url = await getImageUrl(img);
    const user = await Users.findOne({ id });
    user.profile_photo = url;
    user.full_name = fullName;
    user.username = username;
    await user.save();
  } catch (e) {
    throw new Error(
      e instanceof Error ? e.message : "Couldn't edit account info"
    );
  }
};
