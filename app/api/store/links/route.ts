import { LinkModel } from "@/app/_schemas";
import { prisma } from "@/lib/prisma";
import { Link } from "@prisma/client";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
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
      store: { connect: { id: body.storeId } },
      user: { connect: { email: session?.user?.email! } },
    },
  });

  return NextResponse.json({ success: true, link });
}
