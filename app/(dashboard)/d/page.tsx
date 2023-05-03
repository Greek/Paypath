"use client";

import { ThemeToggle } from "../../themes-toggle";

export default function dashboard({}) {
  return (
    <>
      {/* <h1>hi {session?.user?.name}</h1> */}
      <ThemeToggle /> <p>Hello world</p>
    </>
  );
}
