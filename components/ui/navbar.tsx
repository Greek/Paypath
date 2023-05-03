"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./button";
import { useRef } from "react";

export default function Sidebar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { data: session } = useSession();

  return (
    <div className={`flex flex-row w-12`}>
      {!session?.user ? (
        <Button
          variant={"default"}
          className={"rounded-[25px]"}
          onClick={() => {
            buttonRef.current!.disabled = true;
            signIn("github");
          }}
          ref={buttonRef}
        >
          Sign in
        </Button>
      ) : (
        <Button
          variant={"default"}
          className={"rounded-[25px]"}
          onClick={() => {
            buttonRef.current!.disabled = true;
            signOut();
          }}
          ref={buttonRef}
        >
          Sign out
        </Button>
      )}
    </div>
  );
}
