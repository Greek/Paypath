import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { AlternativeSignInButton } from "@/components/sign-in";
import { prisma } from "@/lib/prisma";
import { DoorOpen, Search, StoreIcon } from "lucide-react";
import { getServerSession } from "next-auth";

export default async function BaseStorePage({
  params,
}: {
  params: { name: string };
}) {
  const session = getServerSession(authConfig);
  const store = await prisma.store.findFirst({ where: { name: params.name } });

  return (
    <>
      <div className="md:grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
        <div className="bg-gray-100 dark:bg-gray-900">
          <div className="h-full flex flex-col justify-between px-8 pb-8">
            <div className="flex-1 flex flex-col items-center pt-20 pb-[8rem] space-y-1 ">
              <div className="inline-block shrink-0 w-[35%] h-[90%] leading-none overflow-hidden rounded-full border ">
                <div className="w-full h-full flex items-center justify-center text-black text-[30px] dark:text-white !text-opacity-30">
                  <StoreIcon size={30} />
                </div>
              </div>
              <div className="mt-5 flex items-center">
                <span className="text-black dark:text-white text-3xl font-semibold text-center">
                  {store?.name}
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
                {!session ? <AlternativeSignInButton /> : null}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800">
          <div className="hidden sm:flex min-h-[8rem] h-full flex-col items-center justify-center">
            <div className="text-black dark:text-white text-xs !text-opacity-50 text-center">
              <div className="justify-center items-center flex pb-2">
                <Search size={64} />
              </div>
              Nothing to buy here yet.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
