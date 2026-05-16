"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Upload, Film } from "lucide-react";
import FileUpload from "./FileUpload";
import toast from "react-hot-toast";

export default function VideoUploadForm() {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!videoUrl) {
      toast.error("Upload video first");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          videoUrl,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Video published!");
    } catch (err) {
      console.error(err);
      toast.error("Publish failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-gray-200 rounded-2xl shadow-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Film className="w-5 h-5" />
          <h1 className="text-xl font-bold">Upload Reel</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <input
            placeholder="Title"
            className="w-full p-3 rounded border"
            {...register("title", { required: true })}
          />
          {errors.title && <p>Title required</p>}

          {/* Description */}
          <textarea
            placeholder="Description"
            className="w-full p-3 rounded border"
            {...register("description")}
          />

          {/* Upload */}
          <FileUpload
            onSuccess={(url) => {
              console.log("VIDEO URL:", url);
              setVideoUrl(url);
            }}
            onProgress={setUploadProgress}
          />

          {/* Progress */}
          {uploadProgress > 0 && (
            <p>Uploading: {Math.round(uploadProgress)}%</p>
          )}

          {/* Success */}
          {videoUrl && <p className="text-green-600">Video uploaded ✓</p>}

          {/* Submit */}
          <button
            disabled={loading || !videoUrl}
            className="w-full bg-rose-500 text-white p-3 rounded"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" />
                Publishing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Publish Reel
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
