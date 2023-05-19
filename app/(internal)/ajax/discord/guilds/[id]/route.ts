import { discordBotRest } from "@/lib/discord";
import { Routes } from "discord-api-types/v10";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  let guild;
  try {
    guild = await discordBotRest.get(Routes.guild(params.id));
  } catch (error) {
    return new NextResponse("Not found", { status: 404 });
  }
  
  return NextResponse.json(guild);
}
