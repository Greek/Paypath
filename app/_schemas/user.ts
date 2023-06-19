import * as z from "zod";
import {
  CompleteAccount,
  RelatedAccountModel,
  CompleteSession,
  RelatedSessionModel,
  CompleteStore,
  RelatedStoreModel,
  CompleteLink,
  RelatedLinkModel,
  CompleteLicense,
  RelatedLicenseModel,
} from "./index";

export const UserModel = z.object({
  id: z.string(),
  customerId: z.string().nullish(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
});

export interface CompleteUser extends z.infer<typeof UserModel> {
  accounts: CompleteAccount[];
  sessions: CompleteSession[];
  stores: CompleteStore[];
  Link: CompleteLink[];
  licenses: CompleteLicense[];
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserModel.extend({
    accounts: RelatedAccountModel.array(),
    sessions: RelatedSessionModel.array(),
    stores: RelatedStoreModel.array(),
    Link: RelatedLinkModel.array(),
    licenses: RelatedLicenseModel.array(),
  })
);
