"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const GoToPortal = (params: { name: string }) => {
  const { push } = useRouter();

  return (
    <Button
      onClick={() => {
        push(`/${params.name}/portal`);
      }}
      variant={"branded"}
      className={`w-full rounded-full bg-neutral-100 border border-black/10 hover:border-black/20`}
    >
      Portal
    </Button>
  );
};
