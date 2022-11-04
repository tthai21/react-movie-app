import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { api_key, fetcher } from "config";

const TrailerMovie = () => {
  const { movieId } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}&language=en-US`;

  const { data } = useSWR(url, fetcher);

  if (!data) return;
  const { results } = data;

  let trailer = results.find((item) => item.name === "Official Trailer");

  if (!trailer) {
    trailer = results[0];
  }

  const link = `https://www.youtube-nocookie.com/embed/${trailer.key}`;

  return (
    <div className="w-[864px] mx-auto aspect-video mb-20">
      <iframe
        width="864"
        height="486"
        title="Youtube video player"
        src={link}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full object-fill"
      ></iframe>
    </div>
  );
};

export default TrailerMovie;
