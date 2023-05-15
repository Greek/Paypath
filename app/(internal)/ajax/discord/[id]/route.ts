import { authConfig } from "@/app/(internal)/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const session = await getServerSession(authConfig);
  const token = session?.user?.accounts.find((acc) => {
    return acc?.provider == "discord";
  })?.access_token;

  const data = await fetch(
    `https://discord.com/api/v10/guilds/988996693322256426`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then(async (res) => {
    return await res.json();
  });

  console.log(params)

  return NextResponse.json(data);
}
