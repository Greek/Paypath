import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = getServerSession();
  const body = (await req.json()) as { productId: string };

  if (!session)
    return NextResponse.json(
      { success: false, message: "You are not authenticated." },
      { status: 401 }
    );

  const item = await prisma.link.findUnique({
    where: { id: body.productId },
    include: { product: true },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    //@ts-ignore
    amount: item?.product.price as number,
    currency: "USD",
    payment_method_types: ["card"],
  });

  return NextResponse.json({ success: true, data: paymentIntent });
}
