"use server";

import { cookies } from "next/headers";
import RefreshToken from "@/models/refresh_tokens";
import { connectDB } from "./mongoose";
import { redirect } from "next/navigation";
export const signout = async () => {
  try {
    await connectDB();
    const userId = (await cookies()).get("user_id");
    const refreshToken = await RefreshToken.findOne({ user_id: userId?.value });
    await RefreshToken.deleteOne(refreshToken);

    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    allCookies.forEach((cookie) => {
      cookieStore.delete(cookie.name);
    });
  } catch (e) {
    console.log("Error while signing out");
    console.log(e);
  }
  redirect("/login");

  // then route to /login, replace()
};
