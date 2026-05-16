"use client";

import apiClient from "../lib/apiClient";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await apiClient("/api/videos", "GET");

        // handle both possible API shapes
        const list = Array.isArray(res) ? res : res?.data || [];

        setVideos(list);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="h-screen grid place-content-center">
        Loading videos...
      </div>
    );
  }

  return (
    <div className=" w-7xl mx-auto border text-white p-4">
      <h1 className="text-xl font-bold mb-6">Home Page</h1>

      {videos.length === 0 ? (
        <p className="text-gray-400">No videos found</p>
      ) : (
        <div className="grid gap-2 grid grid-cols-4">
          {videos.map((video) => (
            <div
              key={video._id}
              className="border border-gray-500 rounded-xl overflow-hidden"
            >
              <video
                src={video.videoUrl}
                controls
                className="w-full h-100 object-cover"
              />

              <div className="p-3">
                <h2 className="font-bold text-black">{video.title}</h2>
                <p className="text-sm text-black">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
