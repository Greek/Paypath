// import { env } from "@/env.mjs";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

// @ts-ignore
export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  providers: [  
    DiscordProvider({
      clientId: process.env.DISCORD_ID as string,
      clientSecret: process.env.DISCORD_SECRET as string,
      authorization:
        "https://discord.com/api/oauth2/authorize?scope=identify+email+guilds+guilds.join+guilds.members.read",
      profile(profile) {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png";
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }

        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.image_url,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (profile?.email != "apapuig+discord4@gmail.com") return false;

      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (!account) return token;

      const dbUser = await prisma.user.findUnique({
        where: { email: user.email as string },
        include: {
          stores: {
            select: {
              id: true,
              name: true,
              description: true,
              domain: true,
              licenses: true,
            },
          },
          accounts: true,
        },
      });

      if (!dbUser) return token;
      return { ...token, profile: profile };
    },
    // @ts-ignore - cba to fix
    async session({ session, token, a }, params) {
      if (!session) return false;

      const dbUser = await prisma.user.findUnique({
        where: { email: token.email as string },
        include: {
          stores: {
            select: {
              id: true,
              name: true,
              description: true,
              domain: true,
              stripeId: true,
              licenses: true,
            },
          },
          accounts: true,
        },
      });

      return {
        ...session,
        user: dbUser,
        discord: token?.profile,
        guilds: token?.guilds,
        account: dbUser?.accounts.find((acc) => {
          return acc.provider == "discord";
        }),
      };
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith("/products")) return `${baseUrl}/products`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
export const handler: NextAuthOptions = NextAuth(authConfig);
// @ts-ignore
export { handler as GET, handler as POST };
