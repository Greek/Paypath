import { LinkModel } from "@/app/_schemas";
import { authConfig } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { sessionCheck } from "@/lib/sessionCheck";
import { Link, PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { nanoid } from "nanoid";
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
      include: { user: true, product: true },
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
