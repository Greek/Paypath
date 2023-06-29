import { APP_NAME } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const customer = await prisma.user.findFirst({ where: { id: params.id } });

  return {
    title: {
      absolute: `${customer?.name} · ${APP_NAME}`,
    },
  };
}
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
