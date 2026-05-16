import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Video from "../../../models/Video";
import { getServerSession } from "next-auth";
import authOptions from "../../../lib/auth";

// GET all videos
export async function GET() {
  try {
    await connectDB();

    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(videos || [], { status: 200 });
  } catch (error) {
    console.error("GET videos error:", error);

    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 },
    );
  }
}

// CREATE video
export async function POST(request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const { title, description, videoUrl, thumbnailUrl } = body;

    if (!title || !description || !videoUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newVideo = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl: thumbnailUrl || videoUrl, // fallback
      controls: body.controls ?? true,
      transformation: {
        width: 1080,
        height: 1920,
        quality: body?.transformation?.quality ?? 100,
      },
      user: session.user?.email || null,
    });

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error("POST video error:", error);

    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 },
    );
  }
}
