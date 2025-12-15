import { NextRequest, NextResponse } from "next/server";
import EmailVerification from "@/models/email_verifications";
import User from "@/models/users";
import { connectDB } from "@/lib/mongoose";
import { BASE_URL } from "@/utils/global";
import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding";

export async function GET(request: NextRequest) {
  await connectDB();
  const searchParams = request.nextUrl.searchParams;
  const uuid = searchParams.get("token");
  try {
    await validateUser(uuid);
    return NextResponse.redirect(`${BASE_URL}/redirect?status=success`, 302);
  } catch (error) {
    return NextResponse.redirect(`${BASE_URL}/redirect?status=fail`, 302);
  }
}

const validateUser = async (uuid: string | null) => {
  try {
    if (!uuid) {
      console.log("Can't find uuid");
      throw new Error("Can't find uuid");
    }
    const emailToBeVerified = await EmailVerification.findOne({
      secret_code: uuid,
    });
    console.log("EMAIL TO BE VERIFIED");
    console.log(emailToBeVerified);
    if (!emailToBeVerified) {
      console.log("Email to be verified doesn't exist");
      throw new Error("Email to be verified don't exist");
    }
    if (new Date() > emailToBeVerified.expires_in) {
      throw new Error("Verification token expired!");
    }
    console.log(emailToBeVerified.user_id.toString());
    const user = await User.findById(emailToBeVerified.user_id.toString());

    if (!user) {
      console.log("User don't exits");
      throw new Error("User don't exists");
    }
    user.is_verified = true;
    user.save();
    await EmailVerification.deleteOne(emailToBeVerified);
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : "Couldn't validate user");
  }
};
