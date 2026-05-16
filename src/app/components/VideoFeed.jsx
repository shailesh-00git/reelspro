export default function VideoFeed({ videos }) {
  if (!videos?.length) {
    return <p className="text-gray-400">No videos yet</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
