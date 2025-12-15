import { jwtVerify, SignJWT } from "jose";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { BASE_URL } from "./global";

export const generateShortLivedSecretKey = async (
  payload: string,
  key: Uint8Array
) => {
  return await new SignJWT({ payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);
};

export const generateLongLivedSecretKey = async (
  payload: string,
  key: Uint8Array
) => {
  return await new SignJWT({ payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
};

export const checkValidity = async (key: Uint8Array, token: string) => {
  try {
    await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    return true;
  } catch (e) {
    return false;
  }
};

export const sendEmail = async (recipientEmail: string, token: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false,
    auth: {
      user: "apikey",
      pass: process.env.EMAIL_API,
    },
  });

  const verificationLink = `${BASE_URL}/api/verify-account?token=${token}`;

  const mailOptions = {
    from: '"Idea-Fusion-Generator" <reyann.14b@gmail.com>',
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
    return info;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Email sending failed"
    );
  }
};
