import { prisma } from "@/lib/prisma";
import { ProductType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { stripe } from "@/lib/stripe";
import { ProductModel } from "@/app/_schemas";
import { auth } from "@/app/auth";

const mapProductTypeEnum = (type: string) => {
  switch (type) {
    case "Free":
      return ProductType.Free;
    case "Recurring":
      return ProductType.Recurring;
    case "Lifetime":
      return ProductType.Lifetime;
  }
};

export async function GET(req: NextRequest, searchParams: { store: string }) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }
  const store = session?.user?.stores?.find((store) => {
    return store;
  });

  const products = await prisma.product.findMany({
    where: { storeId: searchParams.store },
    include: {
      licenses: true,
    },
  });

  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const store = session?.user?.stores[0];

  const body = await req.json();

  const interval = "month";

  let price;
  if (body.type == "Free") price = null;
  else price = String(body.price);

  const id = nanoid(32);
  await stripe.products.create(
    {
      name: body.name as string,
      id,
      default_price_data: {
        currency: "USD",
        unit_amount: Number(price?.replace(".", "")),
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
      type: mapProductTypeEnum(body.type),
      recurrencyPeriod: interval,
      // @ts-ignore
      price: Number(price?.replace(".", "")),
      server: body.server as string,
      store: { connect: { id: store?.id! } },
    },
  });

  return NextResponse.json({ success: true, id: product.id });
}
