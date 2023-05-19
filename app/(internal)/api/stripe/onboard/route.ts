import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

async function getRawBody(
  readable: ReadableStream<Uint8Array> | null
): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export const POST = async (req: NextRequest) => {
  const sig = req.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_SIGNING as string;

  let event: any;

  try {
    console.log(req.body);

    event = stripe.webhooks.constructEvent(
      await getRawBody(req.body),
      sig!,
      endpointSecret
    );
  } catch (err: unknown) {
    console.log(err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "account.updated": {
      const accountUpdated: Stripe.Account = event.data.object;

      console.log(accountUpdated.metadata?.gatekeepStoreId);
      await prisma.store.update({
        where: { id: accountUpdated.metadata?.gatekeepStoreId as string },
        data: { stripeId: accountUpdated.id },
      });

      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse("OK");
};
