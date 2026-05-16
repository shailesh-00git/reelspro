import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../../../../lib/auth";
import { connectDB } from "../../../../lib/db";
import Video from "../../../../models/Video";

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;

    const [videos, total] = await Promise.all([
      Video.find({ userEmail }).sort({ createdAt: -1 }),
      Video.countDocuments({ userEmail }), // ✅ faster
    ]);

    return NextResponse.json({
      total,
      videos,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user videos" },
      { status: 500 },
    );
  }
}
