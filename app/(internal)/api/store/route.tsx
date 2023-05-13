import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const body = await req.json();

  return NextResponse.json(
    await prisma.store.findUnique({ where: { id: body.id } })
  );
}
