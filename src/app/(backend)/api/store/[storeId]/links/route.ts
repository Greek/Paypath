import { LinkModel } from "@/app/_schemas";
import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { Link } from "@prisma/client";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { storeId: string } }
) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }

  const links = await prisma.link.findMany({
    where: { storeId: context.params.storeId },
    include: { product: true, licenses: true },
  });

  return NextResponse.json(links);
}

export async function POST(
  req: NextRequest,
  context: { params: { storeId: string } }
) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }
  const store = session?.user?.stores?.find((store) => {
    return store;
  });

  const body = (await req.json()) as Link;

  if (!(await LinkModel.safeParseAsync(body)).success)
    return NextResponse.json(await LinkModel.safeParseAsync(body), {
      status: 400,
    });

  const link = await prisma.link.create({
    data: {
      id: nanoid(32),
      nickname: body.nickname,
      product: { connect: { id: body.productId } },
      store: { connect: { id: context.params.storeId } },
      user: { connect: { email: session?.user?.email! } },
    },
  });

  return NextResponse.json({ success: true, link });
}
