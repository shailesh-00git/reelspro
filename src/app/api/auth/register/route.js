import { connectDB } from "../.././../../lib/db";
import User from "../../../../models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 401 },
      );
    }

    console.log("this is file");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered!" },
        { status: 400 },
      );
    }

    await User.create({ email, password });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "Failed to register!" }, { status: 500 });
  }
}
