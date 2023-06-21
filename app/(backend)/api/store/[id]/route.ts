import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }

  return NextResponse.json(
    await prisma.store.findFirst({
      where: {
        OR: [
          { id: context.params.id },
          { name: context.params.id.toLowerCase() },
        ],
      },
      include: {
        licenses: {
          include: {
            customer: true,
            product: true,
            link: true,
          },
        },
      },
    })
  );
}
