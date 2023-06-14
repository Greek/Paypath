"use client";

import CheckoutForm from "@/app/modules/store/forms/CheckoutForm";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Link, Product, Store } from "@prisma/client";
import { StoreIcon } from "lucide-react";
import {
  CompletionContext,
  PriceTotalContext,
} from "./providers/CompletionProvider";
import LinkTag from "next/link";

export const formatPrice = (price: string) => {
  return (
    price.substring(-2, price.length - 2) +
    "." +
    price.substring(price.length - 2, price.length)
  );
};

export default function LinkPurchasePage({
  params,
}: {
  params: { id: string };
}) {
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

  const [completed, setCompletion] = useState(false);

  return (
    <CompletionContext.Provider value={{ completed, setCompletion }}>
      {!completed && link && (
        <div className="md:grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x w-[40rem]">
          <>
            <div className="bg-gray-100 dark:bg-gray-900">
              <div className="h-full flex flex-col justify-between px-5 p-6">
                <div className="flex-1 flex flex-row pt-2 pb-[8rem]">
                  <div className="inline-block shrink-0 w-[80px] h-[80px] leading-none overflow-hidden rounded-full border">
                    <div className="w-full h-full flex items-center justify-center text-black text-[30px] dark:text-white !text-opacity-30">
                      <StoreIcon size={30} />
                    </div>
                  </div>
                  <div className="flex-col flex pl-4">
                    <div className="w-full flex text-lg font-semibold dark:text-white">
                      {link?.store?.name}
                    </div>
                    <div className="w-full flex dark:text-white text-neutral-600 text-2xl font-semibold">
                      {formatPrice(link.product.price as string)}
                    </div>
                    <div className="w-full flex text-neutral-400">
                      per {link.product.recurrencyPeriod}
                    </div>
                  </div>
                </div>
                <div></div>
                <div className="flex flex-col rounded-lg border border-neutral-200">
                  <div className="py-3 px-3 flex items-center justify-between text-sm">
                    <p className="font-semibold">Subtotal</p>
                    <p>${formatPrice(link.product.price as string)}</p>
                  </div>
                  <div className="flex w-full items-center">
                    <div className="grow border-t" aria-hidden="true"></div>
                    <div className="grow border-t" aria-hidden="true"></div>
                  </div>
                  <div className="py-3 px-3 flex items-center justify-between text-sm">
                    <p className="font-semibold">Total</p>
                    <p>${formatPrice(link.product.price as string)}</p>
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
                    <CheckoutForm link={params.id} store={link.store} />
                  </Elements>
                </div>
              </div>
            </div>
          </>
        </div>
      )}{" "}
      {!link && (
        <div className="flex items-center justify-center text-center p-8 prose ">
          <h3>Loading...</h3>
        </div>
      )}
      {completed ? (
        <div className="p-6">
          <h1 className="font-semibold text-3xl mb-2">Almost there! 🎉</h1>
          <p>
            Head to the{" "}
            <LinkTag href={`/${link?.store.name}/portal`}>
              customer portal
            </LinkTag>
          </p>
        </div>
      ) : null}
    </CompletionContext.Provider>
  );
}
