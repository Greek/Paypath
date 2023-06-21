import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!session) return new NextResponse("Not authenticated", { status: 401 });

  return NextResponse.json(
    await prisma.user.findUnique({
      where: { email: session.user?.email as string },
      include: {
        licenses: {
          include: {
            product: true,
          },
        },
      },
    })
  );
}
