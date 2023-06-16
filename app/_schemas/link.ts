import * as z from "zod"
import { CompleteProduct, RelatedProductModel, CompleteStore, RelatedStoreModel, CompleteUser, RelatedUserModel, CompleteLicense, RelatedLicenseModel } from "./index"

export const LinkModel = z.object({
  id: z.string().optional(),
  active: z.boolean().optional(),
  pinned: z.boolean().optional(),
  nickname: z.string().nullish(),
  password: z.string().nullish(),
  passwordProtected: z.boolean().nullish(),
  stock: z.number().int().nullish(),
  hasStockLimit: z.boolean().nullish(),
  freeTrial: z.boolean().nullish(),
  firstCheckoutDate: z.date().nullish(),
  lastCheckoutDate: z.date().nullish(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  productId: z.string(),
  storeId: z.string().optional(),
  userId: z.string().optional().nullish(),
})

export interface CompleteLink extends z.infer<typeof LinkModel> {
  product: CompleteProduct
  store: CompleteStore
  user?: CompleteUser | null
  licenses: CompleteLicense[]
}

/**
 * RelatedLinkModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLinkModel: z.ZodSchema<CompleteLink> = z.lazy(() => LinkModel.extend({
  product: RelatedProductModel,
  store: RelatedStoreModel,
  user: RelatedUserModel.nullish(),
  licenses: RelatedLicenseModel.array(),
}))
