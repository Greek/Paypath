import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();
  if (session === null) return new Response("Unauthorized", { status: 401 });

  const data = await prisma.user.findFirst({
    where: { id: session?.user?.id },
    include: { stores: true },
  });

  if (!data?.stores)
    return NextResponse.json(
      { success: false, message: "Not found" },
      { status: 404 }
    );

  return NextResponse.json(data);
}
