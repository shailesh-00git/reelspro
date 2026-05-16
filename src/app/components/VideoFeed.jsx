export default function VideoFeed({ videos }) {
  if (!videos?.length) {
    return <p className="text-gray-400">No videos yet</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <div
          key={video._id}
          className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
        >
          <video
            src={video.videoUrl}
            controls
            className="w-full h-100h object-cover"
          />

          <div className="p-4">
            <h2 className="font-bold text-white">{video.title}</h2>
            <p className="text-sm text-gray-400">{video.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
