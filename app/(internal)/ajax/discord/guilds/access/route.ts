import { authConfig } from "@/app/(internal)/api/auth/[...nextauth]/route";
import { discordBotRest } from "@/lib/discord";
import { Routes } from "discord-api-types/v10";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authConfig);
  const token = session?.user?.accounts.find((account) => {
    return account.provider == "discord";
  })?.access_token;

  let guild;
  try {
    guild = await discordBotRest.put(
      Routes.guildMember("493093028890673163", "756906016012107836"),
      {
        body: {
          access_token: token,
        },
      }
    );
  } catch (e) {
    return NextResponse.json({ message: "Could not join guild =("});
  }

  return new NextRequest("Ok");
}
