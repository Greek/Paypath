import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }
  const link = await prisma.link.findFirst({
    where: { id: params.id, storeId: session?.user?.stores[0].id },
  });

  if (!link) return notFound();

  return children;
}
