import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbconnect from "@/lib/dbConnect";
import { User } from "@/Models";

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLECLIENTID as string,
      clientSecret: process.env.GOOGLECLIENTSECRECT as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        await dbconnect();

        const existingUser = await User.findOne({ email: user.email });

        console.log("existingUser", existingUser);

        if (!existingUser) {
          const newUser = await User.create({
            name: user.name,
            email: user.email,
          });

          user.id = newUser._id.toString();

          console.log("newuser", newUser);
        } else {
          user.id = existingUser._id.toString();
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
  secret: process.env.JSONWEBTOKEN as string,
};

export default options;
