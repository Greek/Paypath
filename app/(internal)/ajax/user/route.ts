import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ user: { store: { name: "hi", domain: "http://apap04.com" } } });
}
