import { prisma } from "@/lib/prisma";
import { Link, PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  const store = session?.user?.stores?.find((store) => {
    return store;
  });

  const body = (await req.json()) as Link;

  let link;
  try {
    link = await prisma.link.create({
      data: {
        id: nanoid(32),
        nickname: body.nickname,
        product: { connect: { id: body.productId } },
      },
    });
  } catch (e: unknown) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002")
        return NextResponse.json({
          success: false,
          message: "This link already exists.",
        });
    }
  }
  return NextResponse.json({ success: true, link });
}
