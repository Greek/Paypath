import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await getServerSession(authConfig);
  if (!session?.user)
    return NextResponse.json(
      { message: "You are not authenticated." },
      { status: 401 }
    );

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
  const session = await getServerSession(authConfig);
  if (!session?.user)
    return NextResponse.json(
      { message: "You are not authenticated." },
      { status: 401 }
    );

  const license = await prisma.license.findFirst({
    where: {
      OR: [{ id: context.params.id }, { customer: { id: context.params.id } }],
      AND: { storeId: session.user.stores[0].id },
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
