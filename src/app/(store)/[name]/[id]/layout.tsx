import { PurchaseLinkSignInConfrontation } from "@/app/_modules/store/PurchaseLinkSigninConfrontation";
import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { signIn } from "next-auth/react";
import { notFound, redirect } from "next/navigation";

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const session = await auth();

  const link = await prisma.link.findFirst({
    where: { id: params.id, storeId: session?.user?.stores[0].id },
    include: { store: true },
  });

  if (!link) return notFound();

  if (session == null) {
    return (
      <PurchaseLinkSignInConfrontation
        callbackUri={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/${link.store.name}/${link.id}`}
      />
    );
  }

  return children;
}
