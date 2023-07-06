"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const { back } = useRouter();

  return (
    <div className={`flex h-screen flex-col items-center justify-center`}>
      <h2 className=" mb-4 font-semibold md:text-3xl">
        Looks like you&apos;re lost.
      </h2>
      <p>
        Let&apos;s get you back{" "}
        <a className="cursor-pointer text-blue-500" onClick={() => back()}>
          to where you were at
        </a>
        .
      </p>
    </div>
  );
}
