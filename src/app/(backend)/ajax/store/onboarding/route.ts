import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Plan } from "@prisma/client";
import { auth } from "@/app/auth";

export async function POST(req: NextRequest) {
  const formData = await req.json();
  const session = await auth();

  await prisma.store.create({
    data: {
      id: nanoid(30),
      name: formData.name.toLowerCase().replaceAll([" "], "-"),
      displayName: formData.name,
      description: "",
      domain: `${formData.name.replaceAll([" "], "-").toLowerCase()}`,
      User: {
        connect: {
          id: session?.user?.id,
        },
      },
      plan: Plan.Starter,
      stripeId: "",
    },
  });

  return NextResponse.json({ message: "OK" });
}
