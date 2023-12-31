import { auth } from "@/app/auth";
import SignInButton, { AlternativeSignInButton } from "@/components/sign-in";
import { Button } from "@/components/ui/button";
import { APP_NAME, WEBSITE_URL } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { ArrowRight, StoreIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GoToPortal } from "./components/GoToPortal";

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}) {
  const store = await prisma.store.findFirst({ where: { name: params.name } });

  const description =
    store?.description ||
    `Purchase products from ${store?.displayName} on ${APP_NAME}, a way to discover new resources and communities.`;

  return {
    openGraph: {
      title: `${store?.displayName}`,
      description: description,
      siteName: `${APP_NAME}`,
      url: `${WEBSITE_URL}/${store?.name}`,
      locale: "en_US",
      type: "website",
    },
    title: {
      absolute: `${store?.displayName} · ${APP_NAME}`,
    },
    description: description,
  };
}

export default async function StoreModule({
  params,
}: {
  params: { name: string };
}) {
  const session = await auth();
  const store = await prisma.store.findFirst({
    where: { name: params.name },
    include: { Link: { include: { product: true } } },
  });

  if (!store) return notFound();

  return (
    <>
      <div className="md:grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
        <div className="bg-gray-100 dark:bg-gray-900">
          <div className="h-full flex flex-col justify-between px-8 pb-8">
            <div className="flex-1 flex flex-col items-center pt-20 pb-[8rem] space-y-1 ">
              <div className="inline-block shrink-0 w-[35%] h-[90%] leading-none overflow-hidden rounded-full border ">
                <div className="w-full h-30 flex items-center justify-center text-black text-[30px] dark:text-white !text-opacity-30">
                  <StoreIcon size={30} className={"h-2"} />
                </div>
              </div>
              <div className="mt-5 flex items-center">
                <span className="text-black dark:text-white text-3xl font-semibold text-center">
                  {store?.displayName}
                </span>
              </div>
              <div className="px-3 mb-1 text-black dark:text-white text-sm !text-opacity-70 text-center">
                {store?.description
                  ? store.description
                  : "No description. If you are the owner of this store, add a description!"}
              </div>
            </div>
            <div>
              <div className="flex space-x-2">
                {!session ? (
                  <SignInButton callbackUri={`/${params.name}`} />
                ) : null}
                {session && <GoToPortal name={params.name} />}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800">
          <div className="h-full p-8 flex flex-col justify-center space-y-3">
            {store?.Link ? (
              store.Link.filter((link) => {
                return link.active && link.product.active;
              }).map((link) => {
                return (
                  <Link
                    className="block"
                    href={`/${store.name}/${link.id}`}
                    key={link.id}
                  >
                    <div className="relative bg-white dark:bg-gray-800 border-1 border-neutral-600 shadow-sm transition hover:shadow rounded-md">
                      <div className="flex justify-between items-center pl-3 pr-5 py-2">
                        <div>
                          <div className="text-black dark:text-white text-lg">
                            {link.nickname!.length > 0
                              ? link.nickname
                              : link.product.name}
                          </div>
                          <div className="text-black dark:text-white text-xs !text-opacity-50">
                            {link.product.price} / month
                          </div>
                        </div>
                        <div className="text-black dark:text-white !text-opacity-70">
                          <ArrowRight />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p>There&apos;s nothing here...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
