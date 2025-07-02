import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import useFetch from "../hooks/useFetch";
import VideoPlay from "../components/VideoPlay";

const DetailsPage = () => {
  const params = useParams();
  const { data, loading: loadingMain } = useFetchDetails(
    `/${params?.explore}/${params?.id}`
  );
  const { data: castData } = useFetchDetails(
    `/${params?.explore}/${params?.id}/credits`
  );
  const { data: similarData } = useFetch(
    `${params?.explore}/${params?.id}/similar`
  );
  const { data: recommendationData } = useFetch(
    `${params?.explore}/${params?.id}/recommendations`
  );
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const imageURL = useSelector((state) => state.movieData.imageURL);

  const handlePlayVideo = (data) => {
    setPlayVideoId(data);
    setPlayVideo(true);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [params.id, params.explore]);

  if (loadingMain) {
    return (
      <div className="h-[70vh] w-full flex justify-center items-center text-white">
        <div className="animate-spin rounded-full border-4 border-white border-t-red-500 w-10 h-10 mr-3"></div>
        <span className="text-lg">Loading {params?.explore} details...</span>
      </div>
    );
  }

  const hours = Math.floor(data?.runtime / 60);
  const minutes = data?.runtime % 60;

  const writerJobs = ["Writer", "Screenplay", "Story"];
  const writer = [
    ...new Set(
      castData?.crew
        ?.filter((el) => writerJobs.includes(el?.job))
        ?.map((el) => el?.name)
    ),
  ].join(", ");

  return (
    <div>
      {/* Banner */}
      <div className="w-full h-[280px] relative hidden lg:block">
        {data?.backdrop_path ? (
          <img
            src={imageURL + data.backdrop_path}
            className="h-full w-full object-cover"
            alt="Backdrop"
          />
        ) : (
          <div className="h-full w-full bg-neutral-800" /> // gray fallback
        )}
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/95 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          {data?.poster_path ? (
            <img
              src={imageURL + data.poster_path}
              className="h-80 w-60 object-cover rounded"
              alt="Poster"
            />
          ) : (
            <div className="h-80 w-60 bg-neutral-800 rounded flex items-center justify-center text-sm text-neutral-400 text-center px-2">
              No image found
            </div>
          )}

          <button
            onClick={() => handlePlayVideo(data)}
            className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all"
          >
            Play Trailer
          </button>
        </div>

        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400">{data?.tagline}</p>

          <Divider />

          <div className="flex items-center gap-3 text-base max-[390px]:text-sm max-[350px]:text-xs">
            <p>Rating : {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>Votes : {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration : {hours}h {minutes}m
            </p>
          </div>

          <Divider />

          <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
          <p>{data?.overview}</p>

          <Divider />

          <div className="flex items-center gap-3 my-3 text-center text-base max-[390px]:text-sm max-[350px]:text-xs">
            <p>Status : {data?.status}</p>
            <span>|</span>
            <p>
              Release date : {moment(data?.release_date).format("MMMM Do YYYY")}
            </p>
            <span>|</span>
            <p>Revenue : {Number(data?.revenue)}</p>
          </div>

          <Divider />

          <p>
            <span className="text-white">Director :</span>{" "}
            {castData?.crew?.[0]?.name}
          </p>
          <Divider />
          <p>
            <span className="text-white">Writer :</span> {writer}
          </p>

          <Divider />

          <h2 className="font-bold text-lg">Cast :</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4">
            {castData?.cast
              ?.filter((el) => el?.profile_path)
              .map((starCast, index) => (
                <div key={index}>
                  <img
                    src={imageURL + starCast?.profile_path}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                  <p className="font-bold text-center text-sm text-neutral-400">
                    {starCast?.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Related Sections */}
      <HorizontalScrollCard
        data={similarData}
        heading={`Similar ${params?.explore}`}
        media_type={params?.explore}
      />
      <HorizontalScrollCard
        data={recommendationData}
        heading={`Recommendation ${params?.explore}`}
        media_type={params?.explore}
      />

      {/* Video Player Overlay */}
      {playVideo && (
        <VideoPlay
          data={playVideoId}
          close={() => setPlayVideo(false)}
          media_type={params?.explore}
        />
      )}
    </div>
  );
};

export default DetailsPage;
