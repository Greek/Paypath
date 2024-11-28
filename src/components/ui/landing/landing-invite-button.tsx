"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const LandingInviteButton = () => {
  const { push } = useRouter();

  return (
    <Button
      variant={"outline"}
      className="group h-9 rounded-full bg-neutral-200/20 text-black shadow-none hover:border-black/20 dark:border-white/10 dark:text-neutral-300"
      onClick={() => {
        push(`https://discord.gg/3MPGTCPAEe`);
      }}
    >
      Join the Discord
      <ArrowRight className="-mr-1 ml-1 h-5 w-5 stroke-black stroke-1 dark:stroke-neutral-300" />
      {/* <svg
            className="-mr-1 ml-2 stroke-black stroke-1"
            fill="none"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            aria-hidden="true"
          >
            <path
              className="opacity-0 transition group-hover:opacity-100"
              d="M0 5h7"
            ></path>
            <path
              className="transition group-hover:translate-x-[3px]"
              d="M1 1l4 4-4 4"
            ></path>
          </svg> */}
    </Button>
  );
};
