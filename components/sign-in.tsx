"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignInButton() {
  return (
    <Button
      onClick={() => signIn("discord")}
      size="sm"
      className={`w-full bg-[#7289DA] hover:bg-[#7289DA]`}
    >
      Sign in with Discord
    </Button>
  );
}
