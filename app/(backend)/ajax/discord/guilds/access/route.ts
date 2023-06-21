import { auth } from "@/app/auth";
import { discordBotRest } from "@/lib/discord";
import { Routes } from "discord-api-types/v10";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (session == null) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = session?.user?.accounts.find((account) => {
    return account.provider == "discord";
  })?.access_token;

  if (!session) return new NextResponse("Not allowed", { status: 401 });

  const body = await req.json();

  let guild;
  try {
    guild = await discordBotRest.put(
      Routes.guildMember(
        body.id,
        session?.user?.accounts?.find((account) => {
          return account!.provider == "discord";
        })?.providerAccountId
      ),
      {
        body: {
          access_token: token,
        },
      }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Could not join guild =(" });
  }

  return new NextResponse("Ok");
}
