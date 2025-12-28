"use client";

import { signout } from "@/lib/signout.action";
import { Button } from "./ui/button";

const SignoutButton = () => {
  return (
    <form action={signout}>
      <Button type="submit" className="w-full">
        Logout
      </Button>
    </form>
  );
};

export default SignoutButton;
