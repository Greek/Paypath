import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../../../auth/[...nextauth]/route";
import { stripe } from "@/lib/stripe";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await getServerSession(authConfig);
  const store = session?.user?.stores?.find((store) => {
    return store;
  });

  const product = await prisma.product.findUnique({
    where: { id: context.params.id },
  });

  if (product?.storeId != store?.id)
    return NextResponse.json({
      success: false,
      message: "Could not find product.",
    });

  return NextResponse.json({ success: true, product: product });
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  console.log(context.params.id);
  const session = await getServerSession(authConfig);
  const store = session?.user?.stores?.find((store) => {
    return store;
  });

  try {
    const productPrice = (
      await stripe.products.retrieve(context.params.id, {
        stripeAccount: store?.stripeId,
      })
    ).default_price;
    await stripe.products.update(
      context.params.id,
      {
        active: false,
      },
      { stripeAccount: store?.stripeId }
    );
    await stripe.prices.update(
      productPrice as string,
      {
        active: false,
      },
      { stripeAccount: store?.stripeId }
    );

    await prisma.product.update({
      where: { id: context.params.id },
      data: { archived: true },
    });
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ message: "Archived.", success: true });
}
