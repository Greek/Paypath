import { PurchaseLinkSignInConfrontation } from "@/modules/store/PurchaseLinkSigninConfrontation";
import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { APP_NAME, WEBAPP_URL, WEBSITE_URL } from "@/lib/constants";

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
        absolute: `Purchase ${link?.nickname || link?.product.name} on ${
          link?.store.name
        }`,
      },
      description: `${
        link.product.description ||
        `Purchase ${
          link.nickname || link.product.name
        } on Paypath, a way to discover new resources and communities.`
      }`,
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

  if (session == null) {
    return (
      <PurchaseLinkSignInConfrontation
        callbackUri={`${WEBAPP_URL}/${link.store.name}/${link.id}`}
      />
    );
  }

  return children;
}
