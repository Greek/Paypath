import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  const body = (await req.json()) as {
    linkId: string;
    paymentMethod: string;
    customer: { name: string };
  };

  if (!session)
    return NextResponse.json(
      { success: false, message: "You are not authenticated." },
      { status: 401 }
    );

  const item = await prisma.link.findUnique({
    where: { id: body.linkId },
    include: { product: true, store: true },
  });

  let customer;
  try {
    customer = await stripe.customers.create(
      {
        email: session.user?.email as string,
        name: body.customer?.name,
        payment_method: body.paymentMethod,
      },
      { stripeAccount: item?.store.stripeId }
    );

    const stripeProduct = await stripe.products.retrieve(
      item?.product.id as string,
      { stripeAccount: item?.store.stripeId }
    );

    await stripe.subscriptions.create(
      {
        customer: customer.id,
        default_payment_method: body.paymentMethod,
        currency: "USD",
        items: [{ price: stripeProduct.default_price as string }],
        expand: ["latest_invoice.payment_intent"],
      },
      { stripeAccount: item?.store.stripeId }
    );
  } catch (error: unknown) {
    if (error instanceof Stripe.errors.StripeCardError)
      return NextResponse.json(error.raw, { status: 400 });
  }

  return NextResponse.json({
    success: true,
  });
}
