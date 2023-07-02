import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string; storeId: string } }
) {
  const session = await auth();

  let link;
  try {
    link = await prisma.link.findFirst({
      where: {
        id: context.params.id,
      },
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
  context: { params: { id: string; storeId: string } }
) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }

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
        message: "Archived links can't be pinned",
      },
      { status: 400 }
    );

  if (!link.product.active && body.active == true)
    return NextResponse.json(
      {
        success: false,
        message:
          "This link can't be activated because its product is archived.",
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
