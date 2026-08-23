import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const ADMIN_EMAILS = ["kimsfoam@gmail.com", "thatkwon@gmail.com"];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // KaKaoProvider({
    //   clientId: process.env.KAKAO_CLIENT_ID!,
    //   clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    // }),
    // NaverProvider({
    //   clientId: process.env.NAVER_CLIENT_ID!,
    //   clientSecret: process.env.NAVER_CLIENT_SECRET!,
    // }),
  ],

  // jwt
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30일
  },

  callbacks: {
    // jwt token 정의 및 반환
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;

        if (token.email && ADMIN_EMAILS.includes(token.email.toLowerCase())) {
          token.role = "admin";
        } else {
          token.role = "user";
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role ?? "user";
      }
      return session;
    },
  },
};
