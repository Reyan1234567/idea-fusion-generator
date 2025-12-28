"use server";
import User from "@/models/users";
import bcrypt from "bcrypt";
import * as z from "zod";
import { connectDB } from "@/lib/mongoose";
import { FormState, SignupSchema } from "@/Schemas/signup";
import { sendEmail } from "@/utils/signup.helper";
import { createEmailVerification } from "@/utils/emailVerification";

export async function signupUser(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  await connectDB();

  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    repeat_password: formData.get("repeat_password") as string,
    full_name: formData.get("full_name") as string,
  };

  const fields = SignupSchema.safeParse(rawData);
  if (!fields.success) {
    return {
      errors: z.treeifyError(fields.error).properties,
      message: "Please fix the errors ",
      raw: rawData,
    };
  }
  const body = fields.data;
  try {
    if (!body) throw new Error("request body can't be empty");
    const user = await User.findOne({ email: body.email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(body.password.toString(), 10);
      const uuid = crypto.randomUUID();
      const newUser = new User({
        email: body.email,
        password: hashedPassword,
        full_name: body.full_name,
      });
      await newUser.save();
      try {
        await createEmailVerification(uuid, newUser.id);
        await sendEmail(body.email, uuid);
      } catch (e) {
        await User.deleteOne({ id: newUser.id });
        throw new Error("Couldn't send email verification, try again later!");
      }
      return { message: "User creation successful!", success: true };
    } else {
      throw new Error("A user with this email already exists");
    }
  } catch (e) {
    return {
      message: "User creation unsuccessful!",
      success: false,
      error:
        e instanceof Error ? e.message : "Error happened when creating a user!",
    };
  }
}
