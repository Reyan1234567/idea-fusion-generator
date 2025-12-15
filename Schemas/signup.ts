import * as z from "zod";

export type FormState = {
  errors?: {
    email?: { errors: string[] };
    password?: { errors: string[] };
    repeat_password?: { errors: string[] };
    full_name?: { errors: string[] };
  };
  message?: string;
  raw?: {
    email?: string;
    password?: string;
    repeat_password: string;
    full_name: string;
  };
  success?: boolean;
  error?: string;
};

export const SignupSchema = z
  .object({
    email: z.email("Please enter a valid email"),
    password: z
      .string()
      .regex(/[A-Z]/, "password must contain atleast one Upper case character")
      .regex(/[a-z]/, "password must contain atleast one lower case character")
      .regex(
        /[^A-Za-z0-9]/,
        "password must contain atleast one Special character"
      ),
    repeat_password: z.string().min(6, "Password must...."),

    full_name: z.string().min(2, "enter a valid name"),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Passwords don't match",
    path: ["repeat_password"],
  });
