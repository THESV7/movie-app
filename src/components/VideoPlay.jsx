import { IoClose } from "react-icons/io5";
import useFetchDetails from "../hooks/useFetchDetails";

const VideoPlay = ({ data, close, media_type }) => {
  const { data: videoData, loading } = useFetchDetails(
    `/${media_type}/${data?.id}/videos`
  );

  const videoList = videoData?.results || [];

  const selectedVideo =
    videoList.find((video) => video.type === "Trailer") ||
    videoList.find((video) => video.type === "Teaser") ||
    videoList[0];

  const videoKey = selectedVideo?.key;

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-screen-lg aspect-video rounded bg-black shadow-xl overflow-hidden">

        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-2 right-2 text-white text-2xl p-1 bg-neutral-700/80 rounded-full hover:bg-neutral-800 transition"
          aria-label="Close"
        >
          <IoClose />
        </button>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center w-full h-full text-white">
            <div className="animate-spin rounded-full border-4 border-white border-t-red-500 w-8 h-8 mr-3"></div>
            <span>Loading trailer...</span>
          </div>
        ) : !videoKey ? (
          <div className="flex items-center justify-center w-full h-full text-neutral-400 text-lg text-center px-4">
            No trailer or teaser available.
          </div>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?controls=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="YouTube Trailer"
          />
        )}
      </div>
    </section>
  );
};

export default VideoPlay;
