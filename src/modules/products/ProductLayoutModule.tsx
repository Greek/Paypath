import { APP_NAME } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({ where: { id: params.id } });

  return {
    title: `Product "${product?.name}" · ${APP_NAME}`,
  };
}

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  return children;
}
