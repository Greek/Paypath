import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/auth";

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
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }
  const store = await prisma.store.findFirst({
    where: {
      id: session.user?.stores.find((s) => {
        return s.stripeId.length < 1;
      })?.id,
    },
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

  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/d/overview`);
};
