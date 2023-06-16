import { prisma } from "@/lib/prisma";
import { ProductType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../../auth/[...nextauth]/route";
import { nanoid } from "nanoid";
import { stripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authConfig);
  const store = session?.user?.stores?.find((store) => {
    return store;
  });

  const products = await prisma.product.findMany({
    where: { storeId: store?.id },
    include: {
      licenses: true,
    },
  });

  return NextResponse.json(products);
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
    },
  });

  return NextResponse.json({ success: true, id: product.id });
}
