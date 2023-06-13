"use client";

import { TinyErrorMessage } from "@/app/(dashboard)/d/products/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function CheckoutForm({
  link,
}: {
  link: string;
  productId: string;
}) {
  const session = useSession();
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
    setFormSubmitting(true);
    const cardElement = elements?.getElement("card");

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
      <div className={''}>
        <div className={"space-y-4 flex justify-between flex-col"}>
          <div className="pt-3 px-4">
            <label>Email</label>
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
              className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            />
            <TinyErrorMessage>
              {stripeErrorMessage as string} {/* @ts-ignore */}
              {isError && error ? error.response.data.message! : null}
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
              className="w-full mb-4"
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
