"use client";
import apiClient from "../lib/apiClient";
import { useEffect, useState } from "react";

export function Home() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient("/api/videos", "GET");
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [videos.length]);
  return <div className="h-screen grid place-content-center">Home page</div>;
}

export default Home;
