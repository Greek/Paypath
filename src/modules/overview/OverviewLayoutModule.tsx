import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Overview",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session === null) return redirect("/");

  return children;
}
