"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Loading() {
  return (
    <div className={`border-b-[.1em] border-foreground-muted w-full`}>
      <div className="flex flex-col lg:flex-row lg:justify-between px-12 pt-24 pb-20">
        <span className="font-semibold text-4xl lg:text-5xl">Products</span>
        <div className={"space-x-2 mt-2 lg:mt:0"}>
         
        </div>
      </div>
    </div>
  );
}
