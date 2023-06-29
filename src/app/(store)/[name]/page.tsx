import StoreModule from "@/modules/store/StoreModule";
import { prisma } from "@/lib/prisma";
import { APP_NAME, WEBSITE_URL } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  const store = await prisma.store.findFirst({ where: { name: params.name } });

  const description =
    store?.description ||
    `Purchase products from ${store?.name} on ${APP_NAME}, a way to discover new resources and communities.`;

  return {
    openGraph: {
      title: `${store?.name}`,
      description: description,
      siteName: `${APP_NAME}`,
      url: `${WEBSITE_URL}/${store?.name}`,
      locale: "en_US",
      type: "website",
    },
    title: {
      absolute: `${store?.name} · ${APP_NAME}`,
    },
    description: description,
  };
}

export default StoreModule;
