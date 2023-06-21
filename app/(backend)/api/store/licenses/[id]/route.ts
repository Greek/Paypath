import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/app/auth";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }

  const license = await prisma.license.findFirst({
    where: {
      OR: [{ id: context.params.id }, { customer: { id: context.params.id } }],
    },
    include: { customer: { include: { accounts: true } }, product: true },
  });

  if (!license)
    return NextResponse.json(
      { success: false, message: "License not found." },
      { status: 404 }
    );

  return NextResponse.json({ success: true, license });
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }

  const license = await prisma.license.findFirst({
    where: {
      OR: [{ id: context.params.id }, { customer: { id: context.params.id } }],
      AND: { storeId: session?.user?.stores[0].id },
    },
    include: { customer: { include: { accounts: true } }, product: true },
  });

  if (!license)
    return NextResponse.json(
      { success: false, message: "License not found." },
      { status: 404 }
    );

  await prisma.license.delete({ where: { id: license.id } });

  return NextResponse.json({ success: true });
}
