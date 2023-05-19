import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_SEC_KEY as string,
  { apiVersion: "2022-11-15" }
);
