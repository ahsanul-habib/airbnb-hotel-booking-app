import { auth } from "@/auth";
import dbConnect from "@/db/connectMongo";
import userModel from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return new Response(JSON.stringify({ message: "Authentication required!" }), {
        status: 401,
      });
    }

    const email = session.user.email;
    const { role } = await req.json();

    if (!role) {
      return new Response(JSON.stringify({ message: "Role is missing!" }), {
        status: 400,
      });
    }

    await dbConnect();

    const user = await userModel.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "Signup unsuccessful. User not found!" }), {
        status: 400,
      });
    }

    if (user?.role) {
      return NextResponse.redirect(`${req.nextUrl.origin}/signup/success`);
    }

    user.role = role;
    await user.save();

    return NextResponse.redirect(`${req.nextUrl.origin}/signup/success`);
  } catch (error) {
    console.error("Error during user role update:", error);
    return new Response(JSON.stringify({ message: "An error occurred!" }), {
      status: 500,
    });
  }
}
