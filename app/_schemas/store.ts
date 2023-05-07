import * as z from "zod"
import * as imports from "../../prisma/null"
import { CompleteUser, RelatedUserModel } from "./index"

export const StoreModel = z.object({
  id: z.string(),
  name: z.string().max(32, { message: "Your store name must be at most 32 characters." }),
  description: z.string().max(256, { message: "Your description can't be longer than this!" }),
  domain: z.string(),
  userId: z.string(),
})

export interface CompleteStore extends z.infer<typeof StoreModel> {
  User: CompleteUser
}

/**
 * RelatedStoreModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStoreModel: z.ZodSchema<CompleteStore> = z.lazy(() => StoreModel.extend({
  User: RelatedUserModel,
}))
