import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import "@/types/auth";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ profile }) {
      if (!profile) {
        return true; // Allow sign in even if profile is missing
      }

      try {
        // Google OAuth returns profile.sub as the user's unique ID
        const googleSub = (profile.sub ?? (profile as any).id) as string;
        if (!googleSub) {
          console.warn("Google profile missing sub/id field");
          return true; // Allow sign in even if sub is missing
        }

        const email = (profile.email as string | undefined) ?? null;
        const name = (profile.name as string | undefined) ?? null;
        const image = ((profile as any).picture as string | undefined) ?? null;

        console.log(`[NextAuth] Attempting to upsert user: googleSub=${googleSub}, email=${email}`);

        // Используем прямой доступ к prisma.user
        // Проверяем доступность модели в runtime
        if (!('user' in prisma)) {
          console.error("[NextAuth] Prisma user model not found. Available models:", 
            Object.keys(prisma).filter(k => !k.startsWith('$') && !k.startsWith('_')));
          throw new Error("User model not available in Prisma Client");
        }

        const user = await prisma.user.upsert({
          where: { googleSub },
          create: {
            googleSub,
            email,
            name,
            image,
          },
          update: {
            email,
            name,
            image,
          },
        });

        console.log(`[NextAuth] User upserted successfully: { googleSub: ${user.googleSub}, email: ${user.email} }`);
      } catch (error) {
        console.error("[NextAuth] Error upserting user:", error);
        if (error instanceof Error) {
          console.error("[NextAuth] Error message:", error.message);
          console.error("[NextAuth] Error stack:", error.stack);
          // Дополнительная диагностика
          if (error.message.includes("user") || error.message.includes("undefined")) {
            console.error("[NextAuth] Prisma Client models:", Object.keys(prisma).filter(k => !k.startsWith('$') && !k.startsWith('_')));
          }
        }
        // Allow sign in even if DB upsert fails
      }

      return true;
    },
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
