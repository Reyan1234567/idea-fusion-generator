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
  onSubmit?: (payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
  onGoogleSignIn?: () => void;
  loading?: boolean;
};

export default function SignUp({ onSubmit, onGoogleSignIn, loading }: Props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    onSubmit?.({ firstName, lastName, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First name
                </label>
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Last name
                </label>
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

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
                placeholder="Create a password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a className="text-sm text-primary hover:underline" href="#">
                  Already have an account?
                </a>
              </div>
              <Button type="submit" className="ml-2" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-4 w-4"
                fill="none"
                aria-hidden
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.35 1.53 8.27 2.8l6.03-6.04C34.76 2.77 29.69 0 24 0 14.84 0 7.26 5.84 3.6 14.04l7.1 5.52C12.9 14.03 18.93 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.5 24.5c0-1.63-.15-2.85-.47-4.1H24v8.02h12.77c-.55 3.02-3.3 8.37-12.77 8.37-7.62 0-13.94-5.01-16.21-11.73l-7.08 5.44C6.85 42.26 14.97 48 24 48c14.11 0 22.5-9.41 22.5-23.5z"
                />
                <path
                  fill="#4A90E2"
                  d="M9.79 29.27c-1.05-3.08-1.05-6.08 0-9.16L2.71 14.67C.96 18.76.96 25.24 2.71 29.33l7.08-5.06z"
                />
                <path
                  fill="#FBBC05"
                  d="M24 48c6.48 0 11.9-2.15 15.87-5.84l-7.54-5.65C29.36 37.07 26.01 38 24 38c-9.03 0-17.15-5.74-19.69-13.56L2.71 29.33C6.27 37.99 14.95 48 24 48z"
                />
              </svg>
              Sign up with Google
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
