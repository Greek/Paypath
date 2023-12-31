"use client";

import CheckoutForm from "@/modules/store/forms/CheckoutForm";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { Link, Product, Store } from "@prisma/client";
import { StoreIcon } from "lucide-react";
import { CompletionContext } from "./providers/CompletionProvider";
import LinkTag from "next/link";
import { useSession } from "next-auth/react";
import SignInButton from "@/components/sign-in";
import { WEBAPP_URL } from "@/lib/constants";

export const formatPrice = (price: number | null) => {
  if (!price) return 0;

  const newPrice = price.toString();

  return (
    newPrice.substring(-2, newPrice.length - 2) +
    "." +
    newPrice.substring(newPrice.length - 2, newPrice.length)
  );
};

export default function PurchaseLinkModule({
  params,
}: {
  params: { id: string; name: string };
}) {
  const { data: session } = useSession();

  const { data: link, isLoading } = useQuery(["link"], {
    queryFn: async () => {
      return (await axios.get(`/api/store/${params.name}/links/${params.id}`))
        .data as Link & {
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
      {!completed && link && link.product.active && (
        <div className="md:grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:w-[40rem]">
          <div className="bg-gray-100 dark:bg-neutral-900">
            <div className="h-full flex flex-col justify-between px-5 p-6">
              <div className="flex-1 flex flex-row pt-2 pb-[8rem]">
                <div className="inline-block shrink-0 w-[80px] h-[80px] leading-none overflow-hidden rounded-full border">
                  <div className="w-full h-full flex items-center justify-center text-black text-[30px] dark:text-white !text-opacity-30">
                    <StoreIcon size={30} />
                  </div>
                </div>
                <div className="flex-col flex pl-4">
                  <div className="flex text-lg font-semibold dark:text-white">
                    {link?.store?.displayName}
                  </div>
                  <div className="flex dark:text-white text-neutral-600 text-2xl font-semibold">
                    {formatPrice(link.product.price)}
                  </div>
                  <div className="w-full flex text-neutral-400">
                    per {link.product.recurrencyPeriod}
                  </div>
                </div>
              </div>
              <div></div>
              <div className="flex flex-col rounded-lg border border-neutral-200 dark:border-neutral-800">
                <div className="py-3 px-3 flex items-center justify-between text-sm">
                  <p className="font-semibold">Subtotal</p>
                  <p>${formatPrice(link.product.price)}</p>
                </div>
                <div className="flex w-full items-center">
                  <div className="grow border-t border-neutral-800" aria-hidden="true"></div>
                  <div className="grow border-t border-neutral-800" aria-hidden="true"></div>
                </div>
                <div className="py-3 px-3 flex items-center justify-between text-sm">
                  <p className="font-semibold">Total</p>
                  <p>${formatPrice(link.product.price)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-neutral-900 border-l-neutral-800">
            <div className="h-screen sm:flex md:min-h-[8rem] md:h-full flex-col">
              <div className="text-black dark:text-white text-xs !text-opacity-50 w-full">
                {session?.user ? (
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
                ) : (
                  <div className="flex justify-center items-center py-[50%] px-6">
                    <SignInButton
                      callbackUri={`${WEBAPP_URL}/${params.name}/${params.id}`}
                      text="Sign in to Purchase"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}{" "}
      {!link ||
        (!link.product.active && !isLoading && (
          <div className="flex items-center justify-center text-center p-8 dark:text-white">
            <h3>That link does not exist.</h3>
          </div>
        ))}
      {completed ? (
        <div className="p-6">
          <h1 className="font-semibold text-3xl mb-2">Almost there! 🎉</h1>
          <p>
            Head to the{" "}
            <LinkTag href={`/${link?.store.name}/portal`} className="text-blue-300">
              customer portal
            </LinkTag>
          </p>
        </div>
      ) : null}
    </CompletionContext.Provider>
  );
}
