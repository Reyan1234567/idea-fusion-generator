import { NextRequest, NextResponse } from "next/server";
import User from "@/models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import * as z from "zod";

const bodyData = z.object({
  email: z.email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  full_name: z.string().min(1, { message: "full_name is a required field" }),
});

type body = z.infer<typeof bodyData>;

export async function POST(request: NextRequest) {
  const { body }: body = request;
  const validationResult = bodyData.safeParse(body);
  if (!validationResult.success) {
    const issues = validationResult.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));

    return NextResponse.json({
      status: "500",
      message: "Invalid registration data",
      errors: issues,
    });
  }
  try {
    if (!body) throw new Error("request body can't be empty");
    const user = User.find({ email: body.email });
    if (!user) {
      const hashedPassword = bcrypt.hash(body.password, 10);
      const newUser = new User({
        email: body.email,
        password: hashedPassword,
        full_name: body.fullName,
      });
      const newCreatedUser = await newUser.save();
      const token = generateSecretKey(
        newCreatedUser.id,
        process.env.NEXT_PUBLIC_JWT_SECRET,
        body.email
      );
      await sendEmail(body.email, token);
      return NextResponse.json({
        message: "email sent succcessfully",
        status: 200,
      });
    } else {
      throw new Error("user with this email already exists");
    }
  } catch (e) {
    return NextResponse.json({
      message:
        e instanceof Error
          ? e.message
          : "Some error happened related to user creation",
      status: 500,
    });
  }
}

export const generateSecretKey = (
  userId: string,
  key: string | undefined,
  email: string
) => {
  if (!key) throw new Error("key can't be empty");
  const token = jwt.sign({ userId, email }, key, {
    expiredIn: "30m",
    issuer: "idea-fusion-generator",
  });
  return token;
};

const sendEmail = async (recipientEmail: string, token: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
      user: "apikey",
      pass: process.env.NEXT_PUBLIC_EMAIL_API,
    },
  });

  const verificationLink = `https://localhost:3000/verify-account?token=${token}`;

  const mailOptions = {
    from: '"Idea-Fusion-Generator" <reyann.11b@gmail.com>',
    to: recipientEmail,
    subject: "Action Required: Verify Your Account",

    text: `Please verify your account by clicking the link: ${verificationLink}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to Our App!</h2>
        <p>Please click the button below to verify your email address and activate your account:</p>
        <a href="${verificationLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Verify My Account
        </a>
        <p>If you did not sign up for this account, please ignore this email.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
};
