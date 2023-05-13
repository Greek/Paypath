"use client";

import { AuthContext } from "@/app/AuthContext";
import { SessionProvider } from "next-auth/react";

export default function Layout({
  children,
}: {
  children: React.ReactElement[];
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
