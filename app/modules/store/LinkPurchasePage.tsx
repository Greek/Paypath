"use client";

import CheckoutForm from "@/app/modules/store/forms/CheckoutForm";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Link, Product, Store } from "@prisma/client";
import { StoreIcon } from "lucide-react";

export default function LinkPurchasePage({
  params,
}: {
  params: { id: string };
}) {
  const session = useSession();
  const { data: link, isLoading } = useQuery(["link"], {
    queryFn: async () => {
      return (await axios.get(`/api/store/links/${params.id}`)).data as Link & {
        store: Store;
        product: Product;
      };
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchInterval: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string, {
    stripeAccount: link?.store?.stripeId,
  });

  return (
    <>
      <div className="md:grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x w-[40rem]">
        {link ? (
          <>
            <div className="bg-gray-100 dark:bg-gray-900">
              <div className="h-full flex flex-col justify-between px-4 pb-8 pt-2">
                <div className="flex-1 flex flex-row pt-2 pb-[8rem]">
                  <div className="inline-block shrink-0 w-[35%] h-[90%] leading-none overflow-hidden rounded-full border ">
                    <div className="w-full h-full flex items-center justify-center text-black text-[30px] dark:text-white !text-opacity-30">
                      <StoreIcon size={30} />
                    </div>
                  </div>
                  <div className="flex-col flex pl-4">
                    <div className="w-full flex pt-1 text-lg font-semibold dark:text-white">
                      {link?.store?.name}
                    </div>
                    <div className="w-full flex dark:text-white text-neutral-400 text-2xl">
                      {link?.product?.price}
                    </div>
                    <div className="w-full flex text-neutral-400">
                      per {link.product.recurrencyPeriod}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800">
              <div className="hidden sm:flex min-h-[8rem] h-full flex-col">
                <div className="text-black dark:text-white text-xs !text-opacity-50 w-full">
                  <Elements
                    stripe={stripe}
                    options={{
                      fonts: [
                        {
                          cssSrc:
                            "https://fonts.googleapis.com/css2?family=Inter&display=swap",
                          family: "Inter",
                        },
                      ],
                    }}
                  >
                    <CheckoutForm link={params.id} productId={link.productId} />
                  </Elements>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
