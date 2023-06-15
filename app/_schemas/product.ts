import * as z from "zod"
import { ProductType, ProductInterval } from "@prisma/client"
import { CompleteStore, RelatedStoreModel, CompleteLicense, RelatedLicenseModel, CompleteLink, RelatedLinkModel } from "./index"

export const ProductModel = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Your product name cannot be empty." }).max(32, { message: "Your product can't be longer than 32 characters." }),
  type: z.nativeEnum(ProductType).optional(),
  server: z.string().min(1, { message: "A product must have a server ID attached to it!" }),
  active: z.boolean(),
  description: z.string().nullish(),
  price: z.string().nullish(),
  currency: z.string().nullish(),
  recurrencyPeriod: z.nativeEnum(ProductInterval).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  storeId: z.string().optional(),
})

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  store: CompleteStore
  licenses: CompleteLicense[]
  links: CompleteLink[]
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() => ProductModel.extend({
  store: RelatedStoreModel,
  licenses: RelatedLicenseModel.array(),
  links: RelatedLinkModel.array(),
}))
