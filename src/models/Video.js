import mongoose, { Schema } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920,
};

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    videoUrl: {
      type: String,
      required: [true, "Video URL is required"],
    },
    thumbnailUrl: {
      type: String,
      required: [true, "Thumbnail URL is required"],
    },
    controls: {
      type: Boolean,
      default: true,
    },
    transformation: {
      height: {
        type: Number,
        default: VIDEO_DIMENSIONS.height,
      },
      width: {
        type: Number,
        default: VIDEO_DIMENSIONS.width,
      },
      quality: {
        type: Number,
        min: [1, "Quality must be at least 1"],
        max: [100, "Quality cannot exceed 100"],
        default: 100,
      },
    },
  },
  {
    timestamps: true, // Auto-generates createdAt & updatedAt
  },
);

const Video = mongoose.models?.Video || mongoose.model("Video", videoSchema);
export default Video;
