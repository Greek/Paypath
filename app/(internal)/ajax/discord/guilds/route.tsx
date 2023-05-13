import { authConfig } from "@/app/(internal)/api/auth/[...nextauth]/route";
import { Account } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authConfig);
  console.log(session);
  const token = session?.user?.accounts?.find((acc: Account) => {
    return acc.provider == "discord";
  }).access_token;

  const { guilds } = await fetch(
    "https://discord.com/api/v10/users/@me/guilds",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then(async (res) => {
      return await res.json();
    })
    .then((res) => {
      return { guilds: res };
    });

  return NextResponse.json(
    guilds.filter((guild: APIGuild) => {
      return guild.permissions == "140737488355327";
    })
  );
}
