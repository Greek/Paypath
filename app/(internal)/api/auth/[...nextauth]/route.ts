import { env } from "@/env.mjs";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID as string,
      clientSecret: env.GITHUB_SECRET as string,
    }),
    DiscordProvider({
      clientId: env.DISCORD_ID as string,
      clientSecret: env.DISCORD_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (!account) return token;

      const dbUser = await prisma.user.findUnique({
        where: { email: user.email as string },
        include: {
          stores: {
            select: { id: true, name: true, description: true, domain: true },
          },
        },
      });

      if (!dbUser) return token;
      return {
        ...token,
        user: dbUser,
      };
    },
    // @ts-ignore - cba to fix
    async session(params) {
      if (!params.session) return false;
      const dbUser = await prisma.user.findUnique({
        where: { email: params.token.email as string },
        include: {
          stores: {
            select: { id: true, name: true, description: true, domain: true },
          },
        },
      });

      return { ...params.session, user: dbUser };
    },
  },
};
export const handler: NextAuthOptions = NextAuth(authConfig);

export { handler as GET, handler as POST };
