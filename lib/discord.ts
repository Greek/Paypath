import { REST } from "@discordjs/rest";

export const discordBotRest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_TOKEN as string
);
