import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { authConfig } from "../../auth/[...nextauth]/route";

async function getRawBody(
  readable: ReadableStream<Uint8Array> | null
): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable as any) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export const GET = async (req: NextRequest) => {
  const session = await getServerSession(authConfig);
  const store = session?.user?.stores?.find((store) => {
    return store;
  });

  const response = await stripe.oauth.token({
    grant_type: "authorization_code",
    code: req.nextUrl.searchParams.get("code") as string,
  });

  var connectedAccountId = response.stripe_user_id;

  // await stripe.accounts.update(connectedAccountId as string, {
  //   metadata: { gatekeepStoreId: store?.id as string },
  // });

  await prisma.store.update({
    where: { id: store?.id as string },
    data: { stripeId: connectedAccountId },
  });

  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/overview`);
};