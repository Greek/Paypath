"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { back } = useRouter();

  return (
    <div className={`flex flex-col h-screen justify-center items-center`}>
      <h2 className=" md:text-3xl font-semibold mb-4">
        Looks like you&apos;re lost.
      </h2>
      <p>
        Let&apos;s get you back{" "}
        <a className="text-blue-500 cursor-pointer" onClick={() => back()}>
          to where you were at
        </a>
        .
      </p>
    </div>
  );
}
