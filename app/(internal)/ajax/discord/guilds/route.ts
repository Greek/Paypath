import { Guild } from "@/app/(dashboard)/d/products/page";
import { authConfig } from "@/app/(internal)/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authConfig);
  const token = session?.user?.accounts.find((acc) => {
    return acc?.provider == "discord";
  })?.access_token;

  const res = await fetch("https://discord.com/api/v10/users/@me/guilds", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async (res) => {
    return res;
  });

  if (!res.ok) {
    return new NextResponse("Unable to fetch guilds. Try logging out?", {
      status: 400,
    });
  }
  let guildsEligible;
  guildsEligible = (await res.json()).filter((guild: Guild) => {
    return guild.permissions == "140737488355327";
  });

  return NextResponse.json(guildsEligible);
}
