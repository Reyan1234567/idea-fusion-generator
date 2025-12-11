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
import { Separator } from "@/components/ui/separator";

type Props = {
  onSubmit?: (payload: { email: string; password: string }) => void;
  onGoogleSignIn?: () => void;
  loading?: boolean;
};

export default function Login({ onSubmit, onGoogleSignIn, loading }: Props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    onSubmit?.({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a className="text-sm text-primary hover:underline" href="#">
                  Forgot password?
                </a>
              </div>
              <Button type="submit" className="ml-2" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>

          <div className="my-4">
            <Separator />
          </div>

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={() => onGoogleSignIn?.()}
              className="flex items-center justify-center gap-3"
            >
              Sign in with Google
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <a className="text-primary hover:underline" href="#">
                Create one
              </a>
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
