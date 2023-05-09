import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  return NextResponse.json(
    await getServerSession(authConfig).then((r) =>
      r?.user?.stores.find((s) => {
        return s;
      })
    )
  );
}
