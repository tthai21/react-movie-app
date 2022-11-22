import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { tmdb_api, api_key, fetcher } from "config";
import { ReactComponent as StarLogo } from "components/photo/star-icon.svg";
import PersonCard from "components/movies/PersonCard";
import CastMoviePopular from "components/movies/CastMoviePopular";
import { tmdb_url } from "config";

const MovieCastDetailsPage = () => {
  const { personId } = useParams();
  const url = `https://api.themoviedb.org/3/person/${personId}?api_key=${api_key}`;
  const { data } = useSWR(url, fetcher);  
  if(!data) return
  return (
    <>
      <div className="lg:page-container sm:mt-[100px] mb-10 block">
        <div className="lg:flex sm:flex items-start lg:mx-10 justify-center md:items-center ">
          <div className="flex justify-center md:justify-start ">
          {data && (
            <PersonCard
            key={data.id}
            url={tmdb_api.photoUrl(data.profile_path)}
            title={data.name}
            year={data.birthday}
            rate={data.popularity}
            ></PersonCard>
            )}
            </div>
          {data && (
            <div className="text-white sm:ml-[50px] lg:ml-[200px] lg:w-[600px]  sm:w-[600px]">
              <h1 className="text-6xl text-center mb-8">{data?.name}</h1>
              <div className="mb-5">
                <p>Also know as: {data.also_known_as}</p>
              </div>
              <div className="flex justify-between mb-6">
                <span>Date of Birth: {data.birthday}</span>
              </div>
              <div className="mb-5">
                <p>{data.biography}</p>
              </div>

              <div className="mb-12 ">
                <div className="h-4 items-center justify-center">Rating star   
                  <StarLogo className="w-3 h-4 inline mx-2"></StarLogo>
                  {data.popularity}
                </div>
              </div>
            </div>
          )}
        </div>
              <div className="mt-10 lg:w-[990px] sm:w-[660px] mx-auto">
                <div className="mb-10"><span className="text-white text-2xl ">Known For</span></div>
                <CastMoviePopular url={`${tmdb_url}search/person?api_key=${api_key}&query=${data.name}`} ></CastMoviePopular>
              </div>
      </div>
    </>
  );
};



export default MovieCastDetailsPage;
