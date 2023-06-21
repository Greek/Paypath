import { auth } from "@/app/auth";
import { NextRequest, NextResponse } from "next/server";

export const sessionCheck = async (req: NextRequest) => {
  const session = await auth();

  if (!session?.user)
    return NextResponse.json(
      { message: "You are not authenticated." },
      { status: 401 }
    );
  else return session;
};
