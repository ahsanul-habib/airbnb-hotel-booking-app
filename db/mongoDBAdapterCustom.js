import { MongoDBAdapter } from "@auth/mongodb-adapter"
import userModel from "@/models/userModel";

export default function MongoDBAdapterCustom(client){
  return {
    async createUser(profile) {
      const existingUser = await userModel.findOne({ email: profile.email });
      if (existingUser) {
        return existingUser; // Return existing user if already present
      }

      const newUser = new userModel({
        email: profile.email,
        name: profile.name,
        password: "", // Google sign-in doesn't require a password
        role: "guest", // Default role, adjust as needed
      });

      await newUser.save();
      return newUser;
    },

    ...MongoDBAdapter(client),
  };
};
