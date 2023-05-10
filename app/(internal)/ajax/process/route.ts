import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "../../api/auth/[...nextauth]/route";
import { Plan } from "@prisma/client";

export async function POST(req: NextRequest) {
  const formData = await req.json();
  const session = await getServerSession(authConfig);

  await prisma.store.create({
    data: {
      id: nanoid(30),
      name: formData.name,
      description: "lol",
      domain: `${formData.name.replaceAll([" "], "")}`,
      owner: session?.user?.id as string,
      plan: Plan.Starter,
      stripeId: ''
    },
  });

  return NextResponse.json({ message: "OK" });
}
