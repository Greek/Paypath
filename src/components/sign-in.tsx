"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { DoorOpen } from "lucide-react";

export default function SignInButton({
  callbackUri,
  text,
}: {
  callbackUri: string;
  text?: string;
}) {
  return (
    <Button
      onClick={() =>
        signIn("discord", { callbackUrl: callbackUri ?? "/d/overview" })
      }
      variant={"branded"}
      className={`w-full rounded-full bg-neutral-100 border border-black/10 hover:border-black/20`}
    >
      {text || "Sign in with Discord"}
    </Button>
  );
}

export function AlternativeSignInButton() {
  return (
    <button
      type="button"
      className="group w-full px-3 h-9 text-sm rounded-md text-gray-800 dark:text-white bg-white dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 after:via-gray-100 dark:after:via-gray-500 focus:outline-none shadow-sm hover:shadow focus:shadow active:shadow-none box-border relative after:absolute inline-flex items-center align-middle min-w-min select-none outline-none justify-center text-center whitespace-nowrap transition appearance-none focus:outline-none font-medium"
      onClick={() => signIn("discord")}
    >
      <DoorOpen />
      Sign in with Discord
    </button>
  );
}
