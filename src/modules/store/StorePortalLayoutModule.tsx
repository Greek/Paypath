import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  const store = await prisma.store.findFirst({ where: { name: params.name } });

  return {
    title: {
      absolute: `${store?.displayName} Portal`,
    },
  };
}

export default async function Layout({
  params,
  children,
}: {
  params: { id: string; name: string };
  children: React.ReactElement;
}) {
  const session = await auth();
  if (session === null) return redirect(`/${params.name}`);
  // return <SignInButton callbackUri={`/${params.name}/portal`} />;

  return children;
}
