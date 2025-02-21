import NextAuth from "next-auth";
import authConfig from "./auth-config";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoClientPromise from "./db/mongoClientPromise";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { compare } from "bcrypt";
import userModel from "./models/userModel";
import dbConnect from "./db/connectMongo";
import jwt from "jsonwebtoken";
import refreshAccessToken from "./lib/refreshAccessToken";
import refreshAccessTokenGoogle from "./lib/refreshAccessTokenGoogle";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(mongoClientPromise, { databaseName: "airbnb" }),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        await dbConnect();
        if (credentials === null) return null;

        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Please provide both username and password.");
        }

        try {
          const user = await userModel.findOne({ email });

          if (!user) {
            throw new Error("User not found.");
          }

          const isValid = await compare(password, user.password);

          if (!isValid) {
            throw new Error("Invalid password.");
          }

          const accessToken = jwt.sign(
            { id: user.id, email: user.email,image:user.image },
            process.env.AUTH_SECRET,
            { expiresIn: "1m" }
          );
      
          const refreshToken = jwt.sign(
            { id: user.id,email: user.email,image:user.image },
            process.env.AUTH_SECRET,
            { expiresIn: "7d" }
          );

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: "/avatar.png",
            accessToken,
            refreshToken,
            expiresIn: Date.now() + (60 * 1000)
          };
        } catch (error) {
          console.error("Error in authorize function:", error.message);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
        },
    },
    allowDangerousEmailAccountLinking: true,
    }),
  ],
      callbacks: {
        async jwt({ token, user, account }) {

            if (account && user) {

              if(account.provider==="google"){
                user.accessToken= account.access_token,
                user.expiresIn= account.expires_at*1000,
                user.refreshToken= account.refresh_token
              }

                return {
                    accessToken: user.accessToken,
                    expiresIn: user.expiresIn,
                    refreshToken: user.refreshToken,
                    provider: account.provider,
                    user:{
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      image: user.image,
                    },
                };
            }

            if (Date.now() < token?.expiresIn) {
                return token;
            }

            if(token.provider==="google") return refreshAccessTokenGoogle(token);
            else return refreshAccessToken(token);
        },

        async session({ session, token }) {

          session.user = token?.user;
          // session.accessToken = token?.accessToken;
          // session.refreshToken = token?.refreshToken;
          session.error = token?.error;

          return session;
        },
    },
});
