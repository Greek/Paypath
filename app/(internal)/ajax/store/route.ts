import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../../../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { StoreModel } from "@/app/_schemas";

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const session = await getServerSession(authConfig);
  const store = session?.user?.stores.find((s) => {
    return s;
  });

  await StoreModel.safeParseAsync(req.body);

  await prisma.store.update({
    where: { id: store?.id },
    data: { name: body.name, description: body.description },
  });

  return NextResponse.json({ message: "Okay." });
}
