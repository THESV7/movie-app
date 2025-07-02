import { IoClose } from "react-icons/io5";
import useFetchDetails from "../hooks/useFetchDetails";

const VideoPlay = ({ data, close, media_type }) => {
  const { data: videoData } = useFetchDetails(
    `/${media_type}/${data?.id}/videos`
  );

  const videoList = videoData?.results || [];

  const selectedVideo =
    videoList.find((video) => video.type === "Trailer") ||
    videoList.find((video) => video.type === "Teaser") ||
    videoList[0];

  const videoKey = selectedVideo?.key;

  console.log("data", videoData);

  return (
    <section className="fixed bg-neutral-700/50 top-0 right-0 bottom-0 left-0 z-40 flex justify-center items-center">
      <div className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative">
        <button onClick={close} className="absolute -right-1 -top-6 text-3xl">
          <IoClose />
        </button>

        {!videoKey ? (
          <p className="text-center text-neutral-400">
            No trailer or teaser available.
          </p>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?controls=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    </section>
  );
};

export default VideoPlay;
