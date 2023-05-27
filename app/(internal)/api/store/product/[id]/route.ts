import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../../../auth/[...nextauth]/route";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await getServerSession(authConfig);
  const store = session?.user?.stores?.find((store) => {
    return store;
  });

  const body = await req.json();

  return NextResponse.json({
    product: await prisma.product.findUnique({
      where: { id: context.params.id },
    }),
    stripe: await stripe.products.retrieve(context.params.id),
  });
}
