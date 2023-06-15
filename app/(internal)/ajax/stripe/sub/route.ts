import { generateLicenseKey } from "@/lib/nanoid";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const dashify = (s: string) => {
  return (
    s.substring(0, 3) +
    "-" +
    s.substring(4, 8) +
    "-" +
    s.substring(8, 11) +
    "-" +
    s.substring(15, 19)
  );
};

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

  if (!item?.active || item?.product.active)
    return NextResponse.json(
      {
        success: false,
        message: "Archived products cannot be purchased.",
      },
      { status: 400 }
    );

  const localCust = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
  });

  const license = await prisma.license.create({
    data: {
      id: nanoid(23),
      key: dashify(generateLicenseKey()),
      product: { connect: { id: item?.productId } },
      store: { connect: { id: item?.store.id } },
      customer: { connect: { id: localCust?.id } },
    },
  });

  try {
    const cust = await stripe.customers.create(
      {
        email: localCust?.email as string,
        name: body.customer?.name,
        payment_method: body.paymentMethod,
        metadata: { license: license.key ?? "HELLO" },
      },
      { stripeAccount: item?.store.stripeId }
    );

    const stripeProduct = await stripe.products.retrieve(
      item?.product.id as string,
      { stripeAccount: item?.store.stripeId }
    );

    await stripe.subscriptions.create(
      {
        customer: cust.id,
        default_payment_method: body.paymentMethod,
        currency: "USD",
        items: [{ price: stripeProduct.default_price as string }],
        expand: ["latest_invoice.payment_intent"],
        application_fee_percent: 2,
      },
      { stripeAccount: item?.store.stripeId }
    );
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { success: false, message: error.message, error: error },
        { status: 400 }
      );
    }
  }

  return NextResponse.json({
    success: true,
  });
}
