import { auth } from "@/app/auth";
import { APP_NAME } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const link = await prisma.link.findFirst({
    where: { id: params.id },
    include: { product: true },
  });

  return {
    title: {
      absolute: `Link "${link?.nickname || link?.product.name}" · ${APP_NAME}`,
    },
  };
}

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
    where: { id: params.id },
  });

  if (!link) return notFound();

  return children;
}
