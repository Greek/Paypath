import { prisma } from "@/lib/prisma";
import { ProductType } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authConfig } from "../../auth/[...nextauth]/route";
import { nanoid } from "nanoid";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authConfig);
  const store = session?.user?.stores?.find((store) => {
    return store;
  });

  const body = await req.json();

  const name = body.productName as string;
  const description = body.productDescription as string;
  const type = ProductType.Recurring;
  const interval = "month";
  const price = (body.productPrice + 0o0) as string;
  const id = nanoid(32);

  const productStripe = await stripe.products.create(
    {
      name,
      description,
      id,
    },
    { stripeAccount: store?.stripeId }
  );

  await stripe.prices.create(
    {
      product: productStripe.id,
      currency: "USD",
      unit_amount: price as unknown as number,
      recurring: { interval: interval },
    },
    { stripeAccount: store?.stripeId }
  );

  await prisma.product.create({
    data: {
      id,
      name,
      description,
      type,
      recurrencyPeriod: interval,
      price: price as string,
      storeId: store?.id!,
      stripeProductId: id,
    },
  });
}
