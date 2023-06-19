import * as z from "zod";

export const DiscordIntegrationModel = z.object({
  id: z.string(),
  guildId: z.string(),
});
