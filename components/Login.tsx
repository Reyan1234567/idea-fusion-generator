"use client";

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
import { useActionState, useEffect } from "react";
import { login } from "@/lib/login.action";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "@/store/bearStore";

export default function Login() {
  const [state, action, pending] = useActionState(login, { message: "" });
  const setId = useUserStore((state) => state.setId);
  useEffect(() => {
    if (state?.success) {
      toast.info("Welcome 👋");
      setId(state.userId);
      redirect("/home");
    } else if (state?.error) {
      toast.error(state.error ?? "Couldn't log you in");
    }
  }, [state?.success, state?.error]);
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <form action={action} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="you@company.com"
                defaultValue={state?.raw?.email}
                required
                className={state?.errors?.email ? "border-red-500" : ""}
              />
              <p className="text-xs text-red-600">
                {state?.errors?.email?.errors[0]}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                defaultValue={state?.raw?.password}
                required
                className={state?.errors?.password ? "border-red-500" : ""}
              />
              <p className="text-xs text-red-600">
                {state.errors?.password?.errors[0]}
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="flex flex-col gap-2">
            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link className="text-primary hover:underline" href="/signup">
                Create one
              </Link>
            </div>
          </div>
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
