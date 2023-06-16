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
    include: { licenses: true },
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

  const body = await req.json();

  try {
    const productPrice = (
      await stripe.products.retrieve(context.params.id, {
        stripeAccount: store?.stripeId,
      })
    ).default_price;
    await stripe.products.update(
      context.params.id,
      {
        active: body.active,
      },
      { stripeAccount: store?.stripeId }
    );
    await stripe.prices.update(
      productPrice as string,
      {
        active: body.active,
      },
      { stripeAccount: store?.stripeId }
    );

    await prisma.product.update({
      where: { id: context.params.id },
      data: { active: body.active },
    });

    if (body.active == false) {
      await prisma.link.updateMany({
        where: { productId: context.params.id },
        data: { active: false },
      });
    }
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ message: "Archived.", success: true });
}
