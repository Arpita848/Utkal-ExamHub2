import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "demo-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo-client-secret",
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log("[v0] Session callback:", { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      }
    },
    jwt: ({ user, token }) => {
      console.log("[v0] JWT callback:", { user, token })
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: true,
}
