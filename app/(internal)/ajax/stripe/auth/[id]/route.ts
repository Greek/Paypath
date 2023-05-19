import { authConfig } from "@/app/(internal)/api/auth/[...nextauth]/route";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const session = await getServerSession(authConfig);

  if (
    !session?.user?.stores.find((store) => {
      return store.id == context.params.id;
    })
  ) {
    return new NextResponse("That's not your store, bud.", { status: 401 });
  }

  const connectedAccountId = await stripe.accounts.create({
    type: "custom",
    metadata: { gatekeepStoreId: context.params.id },
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  const link = await stripe.accountLinks.create({
    account: connectedAccountId.id,
    return_url: `${process.env.NEXTAUTH_URL}/overview`,
    refresh_url: `${process.env.NEXTAUTH_URL}/overview`,
    type: "account_onboarding",
  });

  return NextResponse.redirect(link.url);
};
