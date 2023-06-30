import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/app/auth";
import { dashify } from "@/app/(backend)/ajax/stripe/sub/route";
import { generateLicenseKey } from "@/lib/nanoid";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }

  const license = await prisma.license.findFirst({
    where: {
      OR: [{ id: context.params.id }, { customer: { id: context.params.id } }],
    },
    include: { customer: { include: { accounts: true } }, product: true },
  });

  if (!license)
    return NextResponse.json(
      { success: false, message: "License not found." },
      { status: 404 }
    );

  return NextResponse.json({ success: true, license });
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = (await req.json()) as {
    active: boolean;
    refresh: boolean;
    cancelDate: Date;
  };

  const license = await prisma.license.findFirst({
    where: {
      OR: [{ id: context.params.id }, { customer: { id: context.params.id } }],
      AND: { storeId: session?.user?.stores[0].id },
    },
    include: { customer: { include: { accounts: true } }, product: true },
  });

  if (!license)
    return NextResponse.json(
      { success: false, message: "License not found." },
      { status: 404 }
    );

  if (body.refresh == true && !license.active)
    return NextResponse.json(
      {
        success: false,
        message: "You can't refresh keys of a de-activated license.",
      },
      { status: 400 }
    );

  await prisma.license.update({
    where: { id: license.id },
    data: {
      active: body.active,
      key: body.refresh ? dashify(generateLicenseKey()) : undefined,
      cancelledAt: body.cancelDate ? body.cancelDate : undefined,
    },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }
}
