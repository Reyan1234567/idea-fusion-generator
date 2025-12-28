import * as z from "zod";

export type FormState = {
  message?: string;
  errors?: {
    email?: { errors?: string[] };
    password?: { errors?: string[] };
  };
  error?: string;
  success?: boolean;
  raw?: {
    email?: string;
    password?: string;
  };
  userId?: string;
};

export const loginRule = z.object({
  email: z.email("Email isn't valid"),
  password: z.string("Password isn't valid"),
});
