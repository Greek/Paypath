import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return NextResponse.json(
    await prisma.store.findFirst({
      where: {
        OR: [
          { id: context.params.id },
          { name: context.params.id.toLowerCase() },
        ],
      },
    })
  );
}
