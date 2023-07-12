import { auth } from "@/app/auth";
import { APIGuild } from "discord-api-types/v10";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }
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
    console.error(await res.text());
    console.error(await res.json());
    return new NextResponse("Unable to fetch guilds. Try logging out?", {
      status: 400,
    });
  }
  let guildsEligible;
  guildsEligible = (await res.json()).filter((guild: APIGuild) => {
    return guild.permissions == "140737488355327";
  });

  return NextResponse.json(guildsEligible);
}
