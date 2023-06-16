import { authConfig } from "@/app/_backend/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await getServerSession(authConfig);
  if (!session?.user)
    return NextResponse.json(
      { message: "You are not authenticated." },
      { status: 401 }
    );

  let link;
  try {
    link = await prisma.link.findUnique({
      where: { id: context.params.id },
      include: { user: true, product: true, store: true },
    });
  } catch (e: unknown) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json({
          success: false,
          message: "This link already exists.",
        });
      }
    }
    console.log(e);
    return NextResponse.json(e);
  }

  if (!link)
    return NextResponse.json(
      { success: false, message: "Could not find link." },
      { status: 404 }
    );
  return NextResponse.json(link);
}

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await getServerSession(authConfig);
  if (!session?.user)
    return NextResponse.json(
      { message: "You are not authenticated." },
      { status: 401 }
    );

  let link;
  try {
    link = await prisma.link.findUnique({
      where: { id: context.params.id },
      include: { user: true, product: true, store: true },
    });
  } catch (e: unknown) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json({
          success: false,
          message: "This link already exists.",
        });
      }
    }
    console.log(e);
    return NextResponse.json(e);
  }

  if (!link)
    return NextResponse.json(
      { success: false, message: "Could not find link." },
      { status: 404 }
    );

  const body = await req.json();

  // if (!link.store.id != session.user.stores[0].id)
  //   return NextResponse.json(
  //     { success: false, message: "Could not find link." },
  //     { status: 404 }
  //   );

  if (
    (!link.active && body.pinned == true) ||
    (body.active == false && body.pinned == true)
  )
    return NextResponse.json(
      {
        success: false,
        message: "Archived products can't be pinned",
      },
      { status: 400 }
    );

  const newLink = await prisma.link.update({
    where: { id: link.id },
    data: {
      nickname: body.nickname,
      active: body.active,
      pinned: body.pinned,
    },
  });

  return NextResponse.json({ success: true, link: newLink });
}
