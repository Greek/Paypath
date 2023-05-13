"use client";

import { Button } from "@/components/ui/button";
import Head from "next/head";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <>
      <Head>
        <title>This page has a title 🤔</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={`border-b-[.1em] border-foreground-muted w-full`}>
        <div className="flex flex-col lg:flex-row lg:justify-between px-10 pt-24 pb-20">
          <span className="font-semibold text-4xl lg:text-5xl">Settings</span>
        </div>
      </div>
      <div className="flex flex-row space-x-2">
        <div className={`flex space-y-2 p-8 w-[450px]`}>
          <Button variant={"ghost"} className="w-full content-start">
            <span className={`text-left`}>General</span>
          </Button>
        </div>
        <div className="flex flex-col w-full space-y-4 pr-12 py-4 h-screen">
          {children}
        </div>
      </div>
    </>
  );
}
