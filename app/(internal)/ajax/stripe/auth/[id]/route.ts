import { authConfig } from "@/app/(internal)/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const session = await getServerSession(authConfig);

  // if (
  //   !session?.user?.stores.find((store) => {
  //     return store.id == (json.id as string);
  //   })
  // ) {
  //   return new NextResponse("That's not your store, bud.", { status: 401 });
  // }

  return NextResponse.redirect(
    `https://connect.stripe.com/oauth/v2/authorize?response_type=code&client_id=${process.env.STRIPE_CONNECT_ID}&scope=read_write&redirect_uri=${process.env.NEXTAUTH_URL}/api/stripe/onboard`
  );
};
