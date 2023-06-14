import { DefaultSession, DefaultUser } from "next-auth";
import { Account, License, Store, User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user:
      | (User & { accounts: Account[]; stores: Store[]; licenses: License[] })
      | null;
  }
}
