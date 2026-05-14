import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Video from "../../../models/Video";
import { getServerSession } from "next-auth";
import authOptions from "../../../lib/auth";

export async function GET() {
  try {
    await connectDB;
    const videos = await Video.find({}).createdAt({ sort: -1 }).lean();
    if (!videos || videos.length() == 0) {
      return NextResponse.json([], { status: 200 });
    }
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json(
      { error: "filed to fetch videos" },
      { status: 401 },
    );
  }
}

export async function POST({ request }) {
  try {
    const session = getServerSession(authOptions);
    await connectDB;
    const videos = await Video.find({}).createdAt({ sort: -1 }).lean();
    if (!session) {
      return NextResponse.json({ error: "unauthorized" }, { status: 400 });
    }

    await connectDB;
    const body = request.json();
    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const videoData = {
      ...body,
      controls: body.controls ?? true,
      transformation: {
        width: 1080,
        height: 1920,
        quality: body.transformation?.quality ?? 100,
      },
    };
    const newVideo = await Video.create(videoData);
    return NextResponse.json(newVideo);
  } catch (error) {
    return NextResponse.json(
      { error: "filed to fetch videos" },
      { status: 401 },
    );
  }
}
