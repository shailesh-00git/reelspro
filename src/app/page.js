"use client";

import {apiClient} from "../lib/apiClient";
import { useEffect, useState } from "react";
import LeftSidebar from "./components/LeftSidebar";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();

        setVideos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false); // ✅ FIXED
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <div className="h-screen text-2xl grid place-content-center">Loading...</div>;
  }

  return (
    <div className="h-screen grid grid-cols-4 overflow-hidden border border-gray-300">
      {/* LEFT SIDEBAR */}
      <div className="col-span-1 border-r border-gray-300 overflow-y-auto">
        <LeftSidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="col-span-3 overflow-y-auto p-4">
        <div className="grid grid-cols-3 gap-4">
          {videos.length === 0 ? (
            <p className="text-gray-400">No videos found</p>
          ) : (
            videos.map((video) => (
              <div
                key={video._id}
                className="border rounded-xl overflow-hidden bg-white"
              >
                <video
                  src={video.videoUrl}
                  controls
                  className="w-full h-64 object-cover bg-black"
                />

                <div className="p-2">
                  <h2 className="font-bold text-black text-sm">
                    {video.title}
                  </h2>
                  <p className="text-xs text-gray-600">{video.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
