"use client";

import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signupUser } from "@/lib/signup.actions";
import { toast } from "sonner";

export default function SignUp() {
  const [state, formAction, isPending] = React.useActionState(signupUser, {
    message: "",
  });
  React.useEffect(() => {
    if (state.success === true) {
      toast.info("Email sent", {
        description: "Check your Emails and Verify your account!",
      });
      redirect("/login");
    } else if (state.success === false) {
      toast.error(state.error);
    }
  }, [state.error, state.success]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <form action={formAction} className="space-y-4">
            <div className="grid gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full name
                </label>
                <Input
                  type="text"
                  name="full_name"
                  placeholder="First name"
                  required
                  minLength={2}
                  maxLength={100}
                  defaultValue={state.raw?.full_name}
                  className={state.errors?.full_name ? "border-red-500" : ""}
                />
                <p className="text-xs text-red-600">
                  {state.errors?.full_name?.errors[0]}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="you@company.com"
                required
                defaultValue={state.raw?.email}
                className={state.errors?.email ? "border-red-500" : ""}
              />
              <p className="text-xs text-red-600">
                {state.errors?.email?.errors[0]}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="Create a password"
                required
                minLength={8}
                defaultValue={state.raw?.password}
                className={state.errors?.password ? "border-red-500" : ""}
              />
              <p className="text-xs text-red-600">
                {state.errors?.password?.errors[0]}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Repeat Password
              </label>
              <Input
                type="password"
                name="repeat_password"
                placeholder="Confirm your password"
                required
                minLength={8}
                defaultValue={state.raw?.repeat_password}
                className={
                  state.errors?.repeat_password ? "border-red-500" : ""
                }
              />
              <p className="text-xs text-red-600">
                {state.errors?.repeat_password?.errors[0]}
              </p>
            </div>

            <div className="flex flex-col">
              <Button type="submit">
                {isPending ? "Creating user" : "Create User"}
              </Button>
            </div>
            <div className="flex justify-center text-sm text-center gap-1">
              <p className="text-mutxe-textreground">
                Already have an account?{" "}
              </p>
              <Link
                className="text-sm text-primary hover:underline"
                href="/login"
              >
                {" "}
                Login
              </Link>
            </div>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <div className="text-xs text-muted-foreground">
            By continuing you agree to our Terms and Privacy Policy.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
