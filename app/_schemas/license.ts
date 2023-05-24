import * as z from "zod"
import { CompleteStore, RelatedStoreModel, CompleteProduct, RelatedProductModel } from "./index"

export const LicenseModel = z.object({
  id: z.string(),
  email: z.string(),
  key: z.string(),
  discordId: z.string().nullish(),
  storeId: z.string(),
  productId: z.string(),
})

export interface CompleteLicense extends z.infer<typeof LicenseModel> {
  store: CompleteStore
  product: CompleteProduct
}

/**
 * RelatedLicenseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLicenseModel: z.ZodSchema<CompleteLicense> = z.lazy(() => LicenseModel.extend({
  store: RelatedStoreModel,
  product: RelatedProductModel,
}))
