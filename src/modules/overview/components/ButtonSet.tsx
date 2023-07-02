"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { wait } from "@/lib/wait";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function ButtonSet({ storeName }: { storeName: string }) {
  const [visitingPortal, setVisitingPortal] = useState(false);
  const { push } = useRouter();

  return (
    <>
      <Button
        disabled={!!visitingPortal}
        variant={"outline"}
        onClick={async () => {
          setVisitingPortal(true);
          await wait(500);
          push(`/${storeName}`);
        }}
      >
        {visitingPortal && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        Visit Portal
      </Button>
      <Button
        onClick={() => {
          push("/d/links/new");
        }}
      >
        Create Link
      </Button>{" "}
    </>
  );
}
