import { auth } from "@/app/auth";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  return NextResponse.json(
    await auth().then((r) =>
      r?.user?.stores.find((s) => {
        return s;
      })
    )
  );
}
