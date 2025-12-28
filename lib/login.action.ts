"use server";

import { FormState } from "@/Schemas/login";
import { loginRule } from "@/Schemas/login";
import { createRefreshToken } from "@/utils/refreshToken";
import * as z from "zod";
import bcrypt from "bcrypt";
import User from "@/models/users";
import { connectDB } from "./mongoose";
import { cookies } from "next/headers";
import {
  generateLongLivedSecretKey,
  generateShortLivedSecretKey,
} from "@/utils/signup.helper";
export const login = async (
  _: FormState,
  formData: FormData
): Promise<FormState> => {
  await connectDB();
  const fields = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginRule.safeParse(fields);

  if (!parsed.success) {
    return {
      message: "Incorrect Form",
      errors: z.treeifyError(parsed.error).properties,
      raw: fields,
    };
  }
  try {
    const user = await User.findOne({ email: fields.email });
    if (!user) {
      throw new Error("User not found!");
    }
    if (!user.is_verified) {
      throw new Error("User is not verified");
    }
    const result = await bcrypt.compare(fields.password, user.password);

    if (result) {
      user.last_login = new Date();
      user.save();
      await manageTokens(user.id);
      return {
        message: "Login successful",
        success: true,
        userId: user.id,
      };
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Login error!",
      success: false,
    };
  }
};

const manageTokens = async (userId: string) => {
  const accessToken = await generateShortLivedSecretKey(
    userId,
    new TextEncoder().encode(process.env.JWT_ACCESS_SECRET)
  );
  const refreshToken = await generateLongLivedSecretKey(
    userId,
    new TextEncoder().encode(process.env.JWT_ACCESS_SECRET)
  );
  const shortExpiry = new Date(Date.now() + 3600 * 1000 * 24);
  const longExpiry = new Date(Date.now() + 3600 * 1000 * 24 * 7);
  await createRefreshToken(userId, refreshToken);
  (await cookies()).set("access_token", accessToken, {
    expires: shortExpiry,
    httpOnly: true,
  });

  (await cookies()).set("refresh_token", refreshToken, {
    expires: longExpiry,
    httpOnly: true,
  });

  (await cookies()).set("user_id", userId, {
    expires: longExpiry,
    httpOnly: true,
  });
};
