'use client'
import { useRouter, useSearchParams } from "next/navigation";
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
  const search = useSearchParams();

  const isSuccess = search.get("status") === "success";

  if (isSuccess) {
    router.replace("/login");
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
