import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { store: string; active: boolean } }
) => {
  const session = await auth();

  if (session == null) return new Response("Unauthorized", { status: 401 });

  const licenses = await prisma.license.findMany({
    where: {
      customerId: session.user?.id,
      store: { name: req.nextUrl.searchParams.get("store") as string },
      active: Boolean(req.nextUrl.searchParams.get("active")),
    },
  });

  return NextResponse.json(licenses);
};
