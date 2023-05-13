import { DefaultSession, DefaultUser } from "next-auth";
import { Account, Store, User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user:
      | (User & { accounts: Account[]; stores: Store[] })
      | null;
  }
}
