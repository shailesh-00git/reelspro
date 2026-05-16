"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

export default function FileUpload({ onSuccess, onProgress }) {
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null);
  const abortController = new AbortController();

  const authenticator = async () => {
    const response = await fetch("/api/imagekit-auth");

    if (!response.ok) {
      throw new Error("Auth failed");
    }

    const data = await response.json();
    return data; // { signature, expire, token, publicKey }
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      alert("Please select a file");
      return;
    }

    let authParams;
    try {
      authParams = await authenticator();
    } catch (err) {
      console.error("Auth error:", err);
      return;
    }

    const { signature, expire, token, publicKey } = authParams;

    try {
      const res = await upload({
        file,
        fileName: file.name,
        signature,
        expire,
        token,
        publicKey,

        onProgress: (e) => {
          const percent = (e.loaded / e.total) * 100;
          setProgress(percent);

          // 🔥 send to parent
          if (onProgress) onProgress(percent);
        },

        abortSignal: abortController.signal,
      });

      console.log("Upload success:", res);

      // 🔥 SEND URL TO PARENT (CRITICAL FIX)
      if (onSuccess) {
        onSuccess(res.url);
      }
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Aborted");
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request");
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error");
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error");
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} />
      <button type="button" onClick={handleUpload}>
        Upload file
      </button>

      <div style={{ marginTop: 10 }}>
        Upload progress: {Math.round(progress)}%
      </div>
    </div>
  );
}
