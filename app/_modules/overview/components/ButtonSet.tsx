"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function ButtonSet() {
  return (
    <>
      <Button variant={"outline"}>Visit Portal</Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          redirect("/d/links/new");
        }}
      >
        Create Link
      </Button>{" "}
    </>
  );
}
