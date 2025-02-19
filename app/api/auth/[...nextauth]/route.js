// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "lib/mongodb"; // Adjust the path based on your structure
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials.email && credentials.password) {
          return { id: 1, name: "Demo User", email: credentials.email };
        }
        return null;
      }
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/sign-in"
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
