"use client";

import { TinyErrorMessage } from "@/app/(dashboard)/d/products/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Stripe from "stripe";
import { z } from "zod";

const inter = Inter({ subsets: ["latin"] });

export default function CheckoutForm({
  link,
  productId,
}: {
  link: string;
  productId: string;
}) {
  const session = useSession();
  const [stripeErrorMessage, setStripeErrorMessage] = useState<string>();
  const {
    mutate: createSubscription,
    error,
    isError,
  } = useMutation(["createSubscription"], {
    mutationFn: async (data: any) => {
      return (await axios.post("/ajax/stripe/sub", data)).data;
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

  const formSubmit = async (e: { email: string; name: string }) => {
    setStripeErrorMessage("");
    const cardElement = elements?.getElement("card");

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
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
      setStripeErrorMessage(paymentMethodError.message);
      return;
    } else if (paymentMethodError) {
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
      <div className={"space-y-4 p-4"}>
        <div>
          <label>Email</label>
          <Input
            placeholder={session.data?.user?.email as string}
            disabled
          ></Input>
        </div>
        <div>
          <label>Name</label>
          <Input placeholder="Name" {...register("name")}></Input>
          <TinyErrorMessage>{errors.name?.message as string}</TinyErrorMessage>
        </div>
        <div>
          <label>Name</label>
          <CardElement
            className={
              (`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`)
            }
            
          />
          <TinyErrorMessage>
            {stripeErrorMessage as string} {/* @ts-ignore */}
            {isError && error ? error.response.data.message! : null}
          </TinyErrorMessage>
        </div>
        {/* <TinyErrorMessage>{stripeErrorMessage}</TinyErrorMessage> */}
        <Button type="submit">Submut</Button>
      </div>
    </form>
  );
}
