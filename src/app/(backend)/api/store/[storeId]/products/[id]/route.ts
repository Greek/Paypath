import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/app/auth";

export async function GET(
  req: NextRequest,
  context: { params: { id: string; storeId: string } },
  searchParams: { store: string }
) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }

  const product = await prisma.product.findFirst({
    where: {
      id: context.params.id,
      store: {
        AND: [{ name: context.params.storeId, owner: session?.user?.id }],
      },
    },
    include: { licenses: true },
  });

  if (!product)
    return NextResponse.json({
      success: false,
      message: "Could not find product.",
    });

  return NextResponse.json({ success: true, product: product });
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string; storeId: string } }
) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }
  const store = await prisma.store.findFirst({
    where: {
      AND: [{ name: context.params.storeId, owner: session?.user?.id }],
    },
    include: { licenses: true },
  });

  const body = await req.json();
  console.log(body);

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
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ message: "Archived.", success: true });
}
