import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const sig = req.headers.get("stripe-signature");
  const endpointSecret =
    "";

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(
      await req.json(),
      sig!,
      endpointSecret
    );
  } catch (err: unknown) {
    if (err instanceof Stripe.errors.StripeError) {
      return new NextResponse(`Webhook Error: ${err.message}`);
    }
  }

  // Handle the event
  switch (event.type) {
    case "account.updated": {
      const accountUpdated: Stripe.Account = event.data.object;

      console.log(accountUpdated.metadata?.gatekeepStoreId)
      await prisma.store.update({
        where: { id: accountUpdated.metadata?.gatekeepStoreId as string },
        data: { stripeId: accountUpdated.id },
      });

      break;
    }
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse("OK");
};
