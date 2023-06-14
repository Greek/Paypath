import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  if (!session) return new NextResponse("Not authenticated", { status: 401 });

  return NextResponse.json(
    await prisma.user.findUnique({
      where: { email: session.user?.email as string},
      include: { licenses: true },
    })
  );
}
