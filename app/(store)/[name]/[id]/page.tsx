"use client";

import CheckoutForm from "./CheckoutForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentIntent, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Link, Product, Store } from "@prisma/client";

export default function Page({ params }: { params: { id: string } }) {
  const session = useSession();
  const { data: link, isLoading } = useQuery(["link"], {
    queryFn: async () => {
      return (await axios.get(`/api/store/links/${params.id}`)).data as Link & {store: Store, product: Product};
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    refetchInterval: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const [clientSecret, setClientSecret] = useState<string>();

  // const {
  //   mutate: mutatePaymentIntent,
  //   isLoading: isLoadingMutation,
  //   data,
  // } = useMutation(["mutatePaymentIntent"], {
  //   mutationFn: async () => {
  //     return (
  //       await axios.post("/ajax/stripe/pi", {
  //         productId: params.id,
  //         customer: {
  //           name: session.data?.user?.name,
  //         },
  //       })
  //     ).data;
  //   },
  //   onSuccess(res: { data: { intent: PaymentIntent; store: string } }) {
  //     setClientSecret(res.data.intent!);
  //   },
  // });

  const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string, {
    stripeAccount: link?.store?.stripeId,
  });

  return (
    <>
      <div className="md:grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x w-[40rem]">
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
              <div className="hidden sm:flex min-h-[8rem] h-full flex-col">
                <div className="text-black dark:text-white text-xs !text-opacity-50 w-full">
                  <Elements
                    stripe={stripe}
                    options={{
                      fonts: [
                        {
                          cssSrc:
                            "https://fonts.googleapis.com/css2?family=Inter&display=swap",
                            family: "Inter"
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
        ) : (
          null
        )}
      </div>
    </>
  );
}
