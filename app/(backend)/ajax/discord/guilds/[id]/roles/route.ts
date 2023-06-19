import { discordBotRest } from "@/lib/discord";
import { APIGuild, APIRole, Routes } from "discord-api-types/v10";
import { NextRequest, NextResponse } from "next/server";

import { GET as RolesGet } from "../route";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  let roles;
  try {
    roles = (await discordBotRest.get(
      Routes.guildRoles(params.id)
    )) as APIRole[];
  } catch (error) {
    return new NextResponse("Not found", { status: 404 });
  }

  // const paypathRole = await discordBotRest.get(
  //   Routes.guildRole(
  //     params.id,
  //     roles.find((role) => {
  //       return role.name.includes("Paypath");
  //     })
  //   )
  // ) ;

  // if (paypathRole.position < )

  return NextResponse.json(roles);
}
