// @ts-ignore

"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Error from "next/error";
import { useEffect, useState } from "react";

export default function RootErrorPage(error: Error) {
  const [isOpen, setOpenState] = useState(false);
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <>
      <div className="container  flex flex-col h-screen items-center justify-center text-left  ">
        <div className={`text-center mx-2`}>
          <p className={`text-3xl font-semibold mb-2`}>Oops.</p>
          {/* @ts-ignore */}
          <p className={`text-md  mb-2 `}> {error.error.message}</p>
        </div>
        <div
          className={`text-left text-sm max-w-[500px] my-2 p-2 px-5 border-t-[.1em] `}
        >
          An error occured and the team has been notified. If you are facing any
          more issues, please join our Discord.
          <br />
          <br />
          {/* @ts-ignore */}
          ID: <code>{error.error.digest}</code>
          <Collapsible
            className={"mt-5 break-words"}
            open={isOpen}
            onOpenChange={setOpenState}
          >
            <CollapsibleTrigger className={`text-muted-foreground`}>
              Check out what caused it...
            </CollapsibleTrigger>
            <CollapsibleContent>
              {/* @ts-ignore */}
              <kbd className={`text-xs`}>{error.error.stack}</kbd>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </>
  );
}
