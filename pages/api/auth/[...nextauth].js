import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import axios from "axios";
import { API } from "~/core/api";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
    // ...add more providers here
  ],

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      let response = undefined
      await axios.post(process.env.SERVER_URI + API.LOGIN, {
        twitter: token?.data?.username,
        avatar: token?.profile_image_url
      }).then(rs => {
        return rs?.data
      }).then(result => {
        response = result
      })
      return { ...token, ...user, ...account, ...profile, ...isNewUser, response };
    },
    async session({ session, token }) {
      session.user = { ...token };
      return session;
    },
  },
  secret: process.env.SECRET,
}

export default NextAuth(authOptions)