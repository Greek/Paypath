import { authConfig } from "@/app/_backend/api/auth/[...nextauth]/route";
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
    individual: {
      first_name: "John",
      last_name: "Doe",
      email: "john@doe.me",
      dob: { month: 10, day: 22, year: 2004 },
      address: {
        line1: "1600 Pennsylvania Avenue NW",
        city: "Washington",
        state: "DC",
        postal_code: "20500",
      },
      ssn_last_4: "0000",
      phone: "4242424242",
      
    },
    business_profile: {
      name: "Test Business",
      mcc: "5734",
      url: "https://paypath.app"
    },
    business_type: "individual",
  });

  const link = await stripe.accountLinks.create({
    account: connectedAccountId.id,
    return_url: `${process.env.NEXTAUTH_URL}/d/overview`,
    refresh_url: `${process.env.NEXTAUTH_URL}/d/overview`,
    type: "account_onboarding",
  });

  return NextResponse.redirect(link.url);
};
