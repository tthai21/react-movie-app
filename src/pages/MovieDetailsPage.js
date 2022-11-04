import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import CastMovie from "components/movies/CastMovie";
import MovieList from "components/movies/MovieList";
import TrailerMovie from "components/movies/TrailerMovie";
import { api_key, fetcher,  tmdb_api, tmdb_url } from "config";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const url = `${tmdb_url}${movieId}?api_key=${api_key}`;
  const { data } = useSWR(url, fetcher);
  if (!data) return null;
  return (
    <>
      <div className="page-container">
        {/* backdrop */}
        <div className="w-full h-[600px] relative">
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          <div
            className="w-full h-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${tmdb_api.photoUrl(data.poster_path)})`,
            }}
          ></div>
        </div>

        {/* Movie Image */}
        <div className="w-f h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 mb-10">
          <img
            src={tmdb_api.photoUrl(data.poster_path)}
            className="w-full h-full object-top rounded-lg"
            alt=""
          />
        </div>

        {/* Movie Title */}
        <div>
          <h1 className="text-4xl text-white text-center font-bold mb-10">
            {data.title}
          </h1>
        </div>

        {/* Movie Tag */}
        <div className="flex items-center gap-x-5 w-full justify-center text-white mb-10">
          {data?.genres.length > 0 &&
            data?.genres.map((item) => (
              <div
                key={item.id}
                className="text-lg border border-slate-900 bg-slate-700 rounded-lg px-2"
              >
                {item.name}
              </div>
            ))}
        </div>

        {/* OverView */}
        <div className="page-container mb-10 w-[600px]">
          <p className="text-white leading-relaxed text-center">
            {data.overview}
          </p>
        </div>

        {/* casts */}
        <div className="flex items-center gap-x-5 justify-center">
          <CastMovie></CastMovie>
        </div>

        {/* Trailer */}
        <div>
          <TrailerMovie></TrailerMovie>
        </div>

        {/* Similar Movies */}
        <div className="mb-10">
          <h2 className="text-white text-2xl mb-10 pl-2">Similar Movies</h2>
          <MovieList
            url={`${tmdb_url}${movieId}/similar?api_key=${api_key}&page=1`}
          ></MovieList>
        </div>
      </div>
    </>
  );
};

export default MovieDetailsPage;
