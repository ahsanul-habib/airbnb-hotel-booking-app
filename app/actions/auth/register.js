"use server";

import { signIn } from "@/auth";
import dbConnect from "@/db/connectMongo";
import userModel from "@/models/userModel";
import { hash } from "bcrypt";

export const doSignUpWithCredentials = async (formData) => {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!name || !email || !password) {
      throw new Error("All fields (name, email, password) are required.");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    await dbConnect();

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email is already in use.");
    }

    const hashedPassword = await hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return {
      success: true,
      message: "User signed up successfully!",
      name: savedUser.name,
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message || "An error occurred." };
  }
};
