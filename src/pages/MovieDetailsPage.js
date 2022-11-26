import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import CastMovie from "components/movies/CastMovie";
import TrailerMovie from "components/movies/TrailerMovie";
import { api_key, fetcher, tmdb_api, tmdb_url } from "config";
import MovieList from "components/movies/MovieList";

const MovieDetailsPage = ({ type }) => {
  const { id } = useParams();
  const DetailsUrl = `${tmdb_url}${type}/${id}?api_key=${api_key}`;

  const { data } = useSWR(DetailsUrl, fetcher);   
  if (!data) return null;
 
  return (
    <>
      <div className="page-container">
        {/* backdrop */}
        <div className="hidden lg:block lg:w-full lg:h-[600px] lg:relative">
          <div className="lg:absolute lg:inset-0 bg-black opacity-70"></div>
          <div
            className="lg:w-full lg:h-full lg:bg-cover lg:bg-no-repeat"
            style={{
              backgroundImage: `url(${tmdb_api.photoUrl(data.backdrop_path)})`,
            }}
          ></div>
        </div>

        {/* Movie Image */}
        <div className="w-f lg:h-[400px] lg:max-w-[800px] mx-auto lg:-mt-[200px] relative z-1 mb-10">
          <img
            src={tmdb_api.photoUrl(data.backdrop_path)}
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
       <div className="flex items-center justify-center ">

        <div className="sm:flex grid grid-cols-2 items-center gap-x-8 justify-center text-white mb-10 ">
          {data?.genres.length > 0 &&
            data?.genres.map((item) => (
              <div
              key={item.id}
              className="flex items-center justify-center text-lg border border-slate-900 bg-slate-700 rounded-lg px-2 mb-4"
              >
                {item.name}
              </div>
            ))}
        </div>
            </div>
           

        {/* OverView */}
        <div className="lg:page-container mb-10 lg:w-[600px]">
          <p className="text-white leading-relaxed text-center">
            {data.overview}
          </p>
        </div>

        {/* casts */}
        <div className="flex items-center gap-x-5 justify-center"
       >
          <CastMovie type={type}></CastMovie>
        </div>

        {/* Trailer */}
        <div className="lg:w-full">
          <TrailerMovie type={type}></TrailerMovie>
        </div>

        {/* Similar Movies */}
        <div className="mb-10">
          <h2 className="text-white text-2xl mb-10 pl-2">Similar Movies</h2>
          <MovieList type={type}></MovieList>
        </div>
      </div>
    </>
  );
};

export default MovieDetailsPage;
