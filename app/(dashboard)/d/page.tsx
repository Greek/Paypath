"use client";

import { ThemeToggle } from "../../themes-toggle";

export default function dashboard({}) {
  return (
    <>
      <div className="flex flex-row text-center items-center">
        {/* <h1>hi {session?.user?.name}</h1> */}
        <ThemeToggle />
        <p>&nbsp; toggle theme. wow</p>
      </div>
    </>
  );
}
