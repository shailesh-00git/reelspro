import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "",
      credentials: {
        username: {},
        password: {},
      },
      async authorize() {},
    }),
  ],
};

export default NextAuth(authOptions);
