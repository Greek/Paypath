import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();
  if (session === null) return new Response("Unauthorized", { status: 401 });

  const data = await prisma.user.findFirst({
    where: { id: session.user?.id },
    select: { stores: true },
  });

  return NextResponse.json(data);
}
