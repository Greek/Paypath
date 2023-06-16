import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const session = await getServerSession();
  // if (
  //   !session?.user?.stores?.find((s) => {
  //     return s.id == context.params.id;
  //   })
  // )
  //   return NextResponse.json(
  //     {
  //       success: false,
  //       name: "That's not your store.",
  //     },
  //     { status: 403 }
  //   );

  return NextResponse.json(
    await prisma.store.findFirst({
      where: {
        OR: [
          { id: context.params.id },
          { name: context.params.id.toLowerCase() },
        ],
      },
      include: {
        licenses: {
          include: {
            customer: true,
            product: true,
            link: true,
          },
        },
      },
    })
  );
}
