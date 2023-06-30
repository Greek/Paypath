import { auth } from "@/app/auth";
import { APP_NAME, WEBSITE_URL } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: string; name: string };
}) {
  const link = await prisma.link.findFirst({
    where: { id: params.id, store: { name: params.name } },
    include: { store: true, product: true },
  });

  if (!link) return { title: "Not found" };

  return {
    openGraph: {
      title: {
        absolute: `${link?.nickname || link?.product.name} on ${
          link?.store.name
        }`,
      },
      description: `${
        link.product.description ||
        `Purchase ${
          link.nickname || link.product.name
        } on Paypath, a way to discover new resources and communities.`
      }`,
      siteName: `${APP_NAME}`,
      url: `${WEBSITE_URL}/${link.store.name}/${link.id}`,
      locale: "en_US",
      type: "website",
    },
    title: `Purchase ${link?.nickname || link?.product.name}`,
    description: `${
      link.product.description ||
      `Purchase ${
        link.nickname || link.product.name
      } on Paypath, a way to discover new resources and communities.`
    }`,
  };
}

export default async function Layout({
  params,
  children,
}: {
  params: { id: string; name: string };
  children: React.ReactNode;
}) {
  const session = await auth();

  const link = await prisma.link.findFirst({
    where: { id: params.id, store: { name: params.name } },
    include: { store: true },
  });

  if (!link) return notFound();

  return children;
}
