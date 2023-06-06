"use client";

import { Input } from "@/components/ui/input";
import {
  CardElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function CheckoutForm({ link }: { link: string }) {
  const {
    formState: { errors },
    register,
  } = useForm();

  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    elements?.update({});
  }, [elements]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage("An unexpected error occurred.");
    // }

    // setIsLoading(false);
  };

  return (
    <form>
      <div className={"space-y-4 p-4"}>
        <div>
          <label>Name</label>
          <Input placeholder="Name" {...register("name")}></Input>
        </div>
        <div>
          <label>Email</label>
          <Input placeholder="Email" {...register("email")}></Input>
        </div>
        <div>
          <label>Name</label>
          <CardElement />
        </div>
      </div>
    </form>
  );
}
