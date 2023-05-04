import { env } from "@/env.mjs";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID as string,
      clientSecret: env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
};
export const handler: NextAuthOptions = NextAuth(authConfig);

export { handler as GET, handler as POST };
