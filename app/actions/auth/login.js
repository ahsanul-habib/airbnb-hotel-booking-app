"use server";

import { signIn } from "@/auth";
import dbConnect from "@/db/connectMongo";
import userModel from "@/models/userModel";
import { compare } from "bcrypt";

export async function doSignInWithCredentials(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      throw new Error("Both email and password are required.");
    }

    await dbConnect();

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found.");
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password.");
    }

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      throw new Error(response.error);
    }

    return { success: true, name: user.name };
  } catch (error) {
    console.error("Sign-in failed:", error.message);
    return { success: false, error: error.message };
  }
}
