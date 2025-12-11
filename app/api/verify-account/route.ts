import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/models/users";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  try {
    if (!token) throw new Error("token can't be empty");
    const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
    const decodedJwt = jwt.verify(token, jwtSecret);
    if (decodedJwt) {
      console.log("DECODED JWT");
      console.log(decodedJwt);
      validateUser(decodedJwt.id);
      return NextResponse.redirect(
        "http://localhost:3000/redirect/success",
        302
      );
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    return NextResponse.json({
      message:
        error instanceof Error
          ? error.message
          : "Error related to verifying account",
    });
  }
}

const validateUser = async (userId: string) => {
  try {
    await User.findByIdAndUpdate(userId, { is_verified: true });
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Couldn't validate user");
  }
};
