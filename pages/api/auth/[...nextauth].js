import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hashSync } from "bcryptjs";
import User from "../../../modals/User";
import connectMongo from "../../../libs/conn";

export const authOptions = {
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      connectMongo();
      if (account.provider === "google") {
        let result = await User.findOne({ email: user.email });
        if (!result)
          result = await User.create({
            username: user.name,
            email: user.email,
            image: user.image,
            password: hashSync(user.id),
            isAdmin: false,
          });
        user._id = result._id;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      user?.isAdmin ? (token.isAdmin = true) : (token.isAdmin = false);
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      token?.isAdmin
        ? (session.user.isAdmin = true)
        : (session.user.isAdmin = false);
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          throw new Error(error);
        });

        const user = await User.findOne({ email: credentials.email });
        console.log(user);
        if (!user) {
          throw new Error("No user Found with Email Please Sign Up...!");
        }

        const checkPassword = await compare(
          credentials.password,
          user.password
        );

        if (!checkPassword) {
          throw new Error("Incorrect Password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
