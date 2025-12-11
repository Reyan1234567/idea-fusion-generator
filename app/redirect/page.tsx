"use client";

import * as React from "react";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RedirectPage() {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const search = useSearchParams();

  const statusQuery = search?.get("status");

  const segments = pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1] ?? "";

  const isSuccess =
    lastSegment.toLowerCase() === "success" || statusQuery === "success";

  useEffect(() => {
    if (isSuccess) {
      router.replace("/signup");
    }
  }, [isSuccess, router]);

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-lg font-medium">Redirecting...</p>
          <p className="text-sm text-muted-foreground">
            You will be taken to the signup page shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Unauthorized Access</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3 text-center">
            <p className="text-muted-foreground">
              You do not have permission to view this resource.
            </p>
            <p className="text-sm text-muted-foreground">
              If you were redirected here by mistake, please try again or
              contact support.
            </p>
          </div>
        </CardContent>

        <CardFooter className="justify-center">
          <Button variant="outline" onClick={() => router.push("/")}>
            Return Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
