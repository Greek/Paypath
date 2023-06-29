import ProductModule from "@/modules/products/ProductModule";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProductS2C(context: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: context.params.id },
    include: { licenses: true },
  });

  if (!product) notFound();

  return <ProductModule params={{ id: context.params.id }} />;
}
