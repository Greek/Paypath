import StoreModule from "@/modules/store/StoreModule";
import { prisma } from "@/lib/prisma";
import { APP_NAME } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  const store = await prisma.store.findFirst({ where: { name: params.name } });

  return {
    title: {
      absolute: `${store?.name} on ${APP_NAME}`,
    },
  };
}

export default StoreModule;
