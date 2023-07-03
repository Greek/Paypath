import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { wait } from "@/lib/wait";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { storeId: string } }
) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }

  const store = await prisma.store.findFirst({
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
      Link: true,
    },
  });

  if (!store)
    return NextResponse.json(
      { success: false, message: "Store not found." },
      { status: 404 }
    );

  await wait(300);

  return NextResponse.json(store);
}
