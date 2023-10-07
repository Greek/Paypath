"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CompletionContext } from "../providers/CompletionProvider";
import { Store } from "@prisma/client";
import { TinyErrorMessage } from "@/modules/products/ProductsModule";

export default function CheckoutForm({
  link,
  store,
}: {
  link: string;
  store?: Store;
}) {
  const session = useSession();

  const { setCompletion } = useContext(CompletionContext);

  const [stripeErrorMessage, setStripeErrorMessage] = useState<string>();
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  const {
    mutate: createSubscription,
    error,
    isError,
  } = useMutation(["createSubscription"], {
    mutationFn: async (data: any) => {
      return (await axios.post("/ajax/stripe/sub", data)).data;
    },
    onError() {
      setFormSubmitting(false);
      return;
    },
    onSuccess() {
      setCompletion(true);
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(
      z.object({ name: z.string().min(1, { message: "A name is required." }) })
    ),
  });

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    elements
      ?.getElement("card")
      ?.update({ style: { base: { color: "white" } } });
  }, [stripe, elements]);

  const formSubmit = async (e: { email: string; name: string }) => {
    setStripeErrorMessage("");
    setFormSubmitting(true);
    const cardElement = elements
      ?.getElement("card")
      ?.update({ style: { base: { color: "white" } } });

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setFormSubmitting(false);
      return;
    }

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement!,
        billing_details: { email: e.email, name: e.name },
      });

    if (
      paymentMethodError?.type === "card_error" ||
      paymentMethodError?.type === "validation_error"
    ) {
      setFormSubmitting(false);
      setStripeErrorMessage(paymentMethodError.message);
      return;
    } else if (paymentMethodError) {
      setFormSubmitting(false);
      setStripeErrorMessage("Oops. Something bad happened.");
      return;
    }

    createSubscription({
      customer: { name: e.name },
      paymentMethod: paymentMethod.id,
      linkId: link,
    });
  };

  return (
    // @ts-ignore
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className={""}>
        <div className={"flex flex-col justify-between space-y-4"}>
          <div className="px-4 pt-3">
            <label>
              Email{" "}
              <a className="text-blue-400" onClick={() => signOut()}>
                Not you?
              </a>
            </label>
            <Input
              placeholder={session.data?.user?.email as string}
              disabled
            ></Input>
          </div>
          <div className="px-4">
            <label>Name</label>
            <Input placeholder="Name" {...register("name")}></Input>
            <TinyErrorMessage>
              {errors.name?.message as string}
            </TinyErrorMessage>
          </div>
          <div className="px-4">
            <label>Card</label>
            <CardElement
              className={`h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`}
            />
            <TinyErrorMessage>
              {stripeErrorMessage as string}
              {/* @ts-ignore */}
              {isError && error!.response.data.message!}
            </TinyErrorMessage>
          </div>
          <div className="px-4">
            <p>
              By subscribing, you agree to Paypath&apos;s Terms of Use and
              Privacy Policy. Your card information is securely handled by{" "}
              <a
                href="https://stripe.com/en-us/privacy"
                className="text-blue-400"
                target="_blank"
              >
                Stripe
              </a>
              .
            </p>
          </div>
          <div></div>
          <div className="px-4">
            <Button
              type="submit"
              className="mb-4 w-full rounded-full"
              variant={"branded"}
              disabled={!!formSubmitting}
            >
              Purchase
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
