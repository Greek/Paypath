import { prisma } from "@/lib/prisma";
import CheckoutForm from "./CheckoutForm";

export default async function Page({ params }: { params: { id: string } }) {
  const link = await prisma.link.findUnique({
    where: { id: params.id },
    include: { user: true, product: true, store: true },
  });

  return (
    <>
      <div className="md:grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
        {link ? (
          <>
            <div className="bg-gray-100 dark:bg-gray-900">
              <div className="h-full flex flex-col justify-between px-4 pb-8">
                <div className="flex-1 flex flex-col items-center pt-2 pb-[8rem] space-y-1 ">
                  <div className="w-full h-full flex text-2xl font-semibold dark:text-white !text-opacity-30">
                    {link?.store?.name}
                  </div>
                  <div className="w-full h-full flex dark:text-white !text-opacity-30">
                    {link?.product?.price}
                  </div>
                  <div className="w-full h-full flex dark:text-white !text-opacity-30">
                    Per x
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800">
              <div className="hidden sm:flex min-h-[8rem] h-full flex-col items-center justify-center">
                <div className="text-black dark:text-white text-xs !text-opacity-50 text-center">
                  <CheckoutForm link={params.id} />
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
