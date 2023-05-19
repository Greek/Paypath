import Stripe from "stripe";

export const stripe = new Stripe(
  "sk_test_51N2fxrKjtX7KwyfC2S3BEgr5psNSyV63V3mnKNmRbFIy3n9x8iCwbyqJ0vho64zTxI7kjhaKXH8SLdFJWyCO9uOf00r5mAHKT2",
  { apiVersion: "2022-11-15" }
);
