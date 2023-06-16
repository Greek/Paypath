import { authConfig } from "@/app/(backend)/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  const link = await prisma.link.findFirst({
    where: { id: params.id, storeId: session?.user?.stores[0].id },
  });

  if (!link) return notFound();

  return children;
}
