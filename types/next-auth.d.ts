import { DefaultSession, DefaultUser } from "next-auth";
import { Store, User } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: (User & { stores: Store[] }) | null;
  }
}
