import NextAuth from "next-auth";

const authConfig = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60
  },
  secret: process.env.AUTH_SECRET,
  providers:[]
};

export const getAuth=async()=>{
  const {auth:authFunc}=await NextAuth(authConfig);
  return authFunc;
}

export default authConfig;
