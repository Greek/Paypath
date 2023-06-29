import StoreModule from "@/modules/store/StoreModule";
import { prisma } from "@/lib/prisma";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  const store = await prisma.store.findFirst({ where: { name: params.name } });

  return {
    title: {
      absolute: `${store?.name} on Paypath`,
    },
  };
}

export default StoreModule;
