import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { storeId: string } }
) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }

  return NextResponse.json(
    await prisma.store.findFirst({
      where: {
        OR: [
          { id: context.params.storeId },
          { name: context.params.storeId.toLowerCase() },
          { displayName: context.params.storeId },
        ],
        AND: [{ owner: session?.user?.id }],
      },
      include: {
        licenses: {
          include: {
            customer: true,
            product: true,
            link: true,
          },
        },
        products: { include: { licenses: true } },
      },
    })
  );
}
