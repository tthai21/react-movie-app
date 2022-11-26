import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { api_key, fetcher } from "config";
import { tmdb_url } from "config";

const TrailerMovie = ({ type }) => {
  const { id } = useParams();
  const TrailerUrl = `${tmdb_url}${type}/${id}/videos?api_key=${api_key}&language=en-US`;
  const { data } = useSWR(TrailerUrl, fetcher); 
  if (!data) return;
  const { results } = data;
  if (results === []) return;
  let trailer = results.find((item) => item.name === "Official Trailer");
  if (!trailer) {
    trailer = results[0];
  }
  const link = `https://www.youtube-nocookie.com/embed/${trailer?.key}`;
  return (
    <div className="lg:w-[864px] mx-auto aspect-video mb-20">
      {results && (
        <iframe
          width="864"
          height="486"
          title="Youtube video player"
          src={link || ""}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full object-fill"
        ></iframe>
      )}
    </div>
  );
};

export default TrailerMovie;
