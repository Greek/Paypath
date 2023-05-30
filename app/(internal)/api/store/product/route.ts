import { prisma } from "@/lib/prisma";
import { ProductType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../../auth/[...nextauth]/route";
import { nanoid } from "nanoid";
import { stripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  const body = await req.json();
  const session = await getServerSession(authConfig);
  const store = session?.user?.stores?.find((store) => {
    return store;
  });

  const products = await prisma.product.findMany({
    where: { storeId: store?.id },
  });

  console.log(products);

  return NextResponse.json(products ?? { error: "whell." });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig);
  const store = session?.user?.stores?.find((store) => {
    return store;
  });

  const body = await req.json();

  const interval = "month";
  const price = (body.price + 0o00) as string;
  const id = nanoid(32);

  await stripe.products.create(
    {
      name: body.name as string,
      id,
      default_price_data: {
        currency: "USD",
        unit_amount: price as unknown as number,
        recurring: { interval: interval },
      },
    },
    { stripeAccount: store?.stripeId }
  );

  const product = await prisma.product.create({
    data: {
      id,
      name: body.name as string,
      description: body.description as string,
      type: ProductType.Recurring,
      recurrencyPeriod: interval,
      price: price as string,
      server: body.server as string,
      store: { connect: { id: store?.id! } },
      stripeProductId: id,
    },
  });

  return NextResponse.json({ success: true, id: product.id });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authConfig);
  const store = session?.user?.stores?.find((store) => {
    return store;
  });

  const body = await req.json();

  try {
    await stripe.products.update(
      body.id.productId,
      {
        active: false,
      },
      { stripeAccount: store?.stripeId }
    );
    await stripe.prices.update(
      body.id.priceId,
      {
        active: false,
      },
      { stripeAccount: store?.stripeId }
    );

    await prisma.product.update({
      where: { id: body.id.productId },
      data: { archived: body.archive },
    });
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ message: "Archived", success: true });
}
