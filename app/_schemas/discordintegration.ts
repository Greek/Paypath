import * as z from "zod"
import { CancelAction, CancelAction } from "@prisma/client"

export const DiscordIntegrationModel = z.object({
  id: z.string(),
  guildId: z.string(),
  cancelAction: z.nativeEnum(CancelAction),
  pastDueAction: z.nativeEnum(CancelAction),
})
