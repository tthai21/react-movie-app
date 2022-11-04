import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { api_key, fetcher,  tmdb_api, tmdb_url } from "config";

const CastMovie = () => {
  const { movieId } = useParams();
  const url = `${tmdb_url}${movieId}/credits?api_key=${api_key}`;
  const { data } = useSWR(url, fetcher);
  if (!data) return null;
  const { cast } = data;
  const newCast = cast.slice(0, 4);
  return (
    <div className="flex items-center gap-5 mb-20">
      {newCast &&
        newCast.map((item) => (
          <div className="mx-2" key={item.id}>
            <div>
              <img
                src={tmdb_api.photoUrl(item.profile_path)}
                className="w-[200px] h-[200px] rounded-full object-cover mb-5"
                alt=""
              ></img>
            </div>
            <div className="text-center text-white">{item.name}</div>
          </div>
        ))}
    </div>
  );
};

export default CastMovie;
