import { authConfig } from "@/app/(backend)/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const sessionCheck = async (req: NextRequest) => {
  const session = await getServerSession(authConfig);

  if (!session?.user)
    return NextResponse.json(
      { message: "You are not authenticated." },
      { status: 401 }
    );
  else return session;
};
