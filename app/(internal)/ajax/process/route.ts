import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "../../api/auth/[...nextauth]/route";
import { StoreModel } from "@/app/_schemas";

export async function POST(req: NextRequest) {
  const formData = await req.json();
  const session = await getServerSession(authConfig);

  await StoreModel.parseAsync(req.body)

  await prisma.store.create({
    data: {
      id: nanoid(30),
      name: formData.name,
      domain: `${formData.name.replaceAll(" ", "")}`,
      userId: session?.user?.id as string,
    },
  });

  return NextResponse.json({ message: "OK" });
}
