import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { CredentialsLogin } from "./_lib/services/auth/auth-index.service";
import type { User, NextAuthConfig } from "next-auth";

export default {
  providers: [
    GitHub,
    Google,
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials.sim || !credentials.password) {
          return null;
        }

        try {
          const res = await CredentialsLogin({
            sim: credentials.sim,
            password: credentials.password,
          });

          const user: User = {
            publicId: res.user.publicId,
            name: res.user.name,
            userModel: res.user.userModel,
          };

          return user;
        } catch (error) {
          throw new Error(
            error instanceof Error ? error.message : "INVALID_CREDENTIALS",
          );
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
