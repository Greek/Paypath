import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  if (!session) return new NextResponse("Not authenticated", { status: 401 });

  return NextResponse.json(
    await prisma.user.findFirst({
      where: { id: session.user?.id },
      include: { licenses: true },
    })
  );
}
