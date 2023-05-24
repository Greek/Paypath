import * as z from "zod"
import { Plan } from "@prisma/client"
import { CompleteUser, RelatedUserModel, CompleteProduct, RelatedProductModel, CompleteLicense, RelatedLicenseModel } from "./index"

export const StoreModel = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Your store name can't be empty." }).max(32, { message: "Your store name can't be longer than 32 characters." }),
  description: z.string().max(256, { message: "Your description can't be longer than 256 characters." }),
  domain: z.string().optional(),
  stripeId: z.string().optional(),
  plan: z.nativeEnum(Plan).optional(),
  owner: z.string().optional(),
})

export interface CompleteStore extends z.infer<typeof StoreModel> {
  User: CompleteUser
  products: CompleteProduct[]
  licenses: CompleteLicense[]
}

/**
 * RelatedStoreModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStoreModel: z.ZodSchema<CompleteStore> = z.lazy(() => StoreModel.extend({
  User: RelatedUserModel,
  products: RelatedProductModel.array(),
  licenses: RelatedLicenseModel.array(),
}))
