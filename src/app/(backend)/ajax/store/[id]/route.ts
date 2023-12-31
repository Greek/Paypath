import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { StoreModel } from "@/app/_schemas";
import { auth } from "@/app/auth";

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const body = await req.json();
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }
  const store = session?.user?.stores.find((s) => {
    return s;
  });

  await StoreModel.safeParseAsync(req.body);

  const newStore = await prisma.store.update({
    where: { id: context.params.id },
    data: {
      displayName: body.displayName,
      name: body.name.replaceAll([" "], "-").toLowerCase(),
      description: body.description,
    },
  });

  return NextResponse.json(newStore);
}
