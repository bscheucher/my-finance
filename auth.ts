import { compareSync } from "bcrypt-ts-edge";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "./auth.config";
import GoogleProvider from "next-auth/providers/google";
import { createUserFromGoogle } from "./lib/actions/user.actions";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: "email",
        },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        // Check if user exists and password is correct
        if (user && user.passwordHash) {
          const isMatch = compareSync(
            credentials.password as string,
            user.passwordHash
          );
          // If password is correct, return user object
          if (isMatch) {
            return {
              id: user.id,
              name: user.fullName,
              email: user.email,
            };
          }
        }
        // If user doesn't exist or password is incorrect, return null
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
     
    async session({ session, user, trigger, token }: any) {
      // Set the user id on the session
      session.user.id = token.sub;
      session.user.name = token.name;
      session.user.role = token.role;
      console.log("Session User Id", session.user.id);

      // If there is an update, set the name on the session
      if (trigger === "update" && token.name) {
        session.user.name = token.name;
      }
      return session;
    },
     
    async jwt({ token, user, account, profile, trigger, session }: any) {
      console.log("JWT Callback 1:", { token, user, account, profile });
      // Assign user fields to token
      if (user) {
        token.id = user.id;
        token.role = user.role;

        // Handle Google Sign-In
        if (account?.provider === "google" && profile?.email) {
          console.log("Google Provider is triggered");
          try {
            // Check if the user exists or create a new user
            const googleUser = await createUserFromGoogle(profile.email);
            console.log("Google User", googleUser);

            if (googleUser) {
              token.id = googleUser.id;
              token.name = googleUser.fullName;
              token.email = googleUser.email;
            }
            console.log("JWT Callback 2:", { token, user, account, profile });
          } catch (error) {
            console.error("Error handling Google sign-in:", error);
            // Handle the error appropriately (e.g., redirect to an error page)
          }
        }

        // If user has no name, use email as their default name
        if (user.name === "NO_NAME") {
          token.name = user.email!.split("@")[0];

          // Update the user in the database with the new name
          await prisma.user.update({
            where: { id: user.id },
            data: { fullName: token.name },
          });
        }

        // Handle session updates (e.g., name change)
        if (session?.user.name && trigger === "update") {
          token.name = session.user.name;
        }
      }

      // Handle session updates (e.g., name change)
      if (session?.user.name && trigger === "update") {
        token.name = session.user.name;
      }

      return token;
    },
    ...authConfig.callbacks,
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
