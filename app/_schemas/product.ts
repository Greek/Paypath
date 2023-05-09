import * as z from "zod"
import { ProductType } from "@prisma/client"
import { CompleteStore, RelatedStoreModel, CompleteLicense, RelatedLicenseModel } from "./index"

export const ProductModel = z.object({
  id: z.string(),
  name: z.string(),
  type: z.nativeEnum(ProductType),
  archived: z.boolean(),
  description: z.string().nullish(),
  price: z.string().nullish(),
  currency: z.string().nullish(),
  recurrencyPeriod: z.string().nullish(),
  stripeProductId: z.string(),
  customers: z.number().int(),
  storeId: z.string(),
})

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  Store: CompleteStore
  License: CompleteLicense[]
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() => ProductModel.extend({
  Store: RelatedStoreModel,
  License: RelatedLicenseModel.array(),
}))
