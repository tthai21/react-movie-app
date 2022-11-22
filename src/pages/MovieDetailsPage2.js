import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import MovieCard from "components/movies/MovieCard";
import { api_key, fetcher, photoUrl, tmdb_url } from "config";
import { ReactComponent as StarLogo } from "components/photo/star-icon.svg";

const MovieDetailsPage2 = () => {
  const { movieId } = useParams();
  const url = `${tmdb_url}${movieId}?api_key=${api_key}`;

  const { data } = useSWR(url, fetcher);

  return (
    <>
      <div className="h-screen page-container">
        <div className="flex items-start mx-10">
          {data && (
            <MovieCard
              key={data.id}
              url={photoUrl.concat(data.poster_path)}
              title={data.title}
              year={data.release_date}
              rate={data.vote_average}
            ></MovieCard>
          )}
          {data && (
            <div className="text-white ml-[200px] w-[600px]">
              <h1 className="text-6xl text-center mb-8">{data.title}</h1>
              <div className="flex justify-between mb-6">
                <span>Release date: {data.release_date}</span>
              </div>
              <div className="mb-5">
                <p>{data.overview}</p>
              </div>
              <div className="mb-5">
                <p>
                  Tags:{" "}
                  {data.genres.map((item) => (
                    <div className="inline-block mx-3 border rounded-lg px-2 bg-slate-600">
                      {item.name}
                    </div>
                  ))}
                </p>
              </div>
              <div className="mb-5">
                <p>Status: {data.status}</p>
              </div>
              <div className="mb-12 ">
                <div className="h-4 items-center justify-center">
                  <StarLogo className="w-3 h-4 inline mx-2"></StarLogo>
                  {data.vote_average}
                </div>
              </div>
              <div>
                <CastsMovie></CastsMovie>
              </div>
              <div>
                <button className="py-3 px-6 rounded-lg capitalize bg-primary mt-auto mr-7">
                  Watch Now
                </button>
                <button className="py-3 px-6 rounded-lg capitalize bg-primary mt-auto">
                  Add to watch list
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

function CastsMovie() {
  const { movieId } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}&language=en-US`;

  const { data } = useSWR(url, fetcher);

  const photoUrl = "https://image.tmdb.org/t/p/original/";
  if (!data) return null;
  const { cast } = data;
  const newCast = cast.slice(0, 4);
  console.log(
    "🚀 ~ file: MovieDetailsPage.js ~ line 89 ~ CastsMovie ~ newCast",
    newCast
  );
  return (
    <div className="flex items-center gap-5 mb-20">
      {newCast &&
        newCast.map((item) => (
          <div className="mx-2">
            <div>
              <img
                src={photoUrl.concat(item.profile_path)}
                className="w-[100px] h-[100px] rounded-full object-cover mb-5"
                alt=""
              ></img>
            </div>
            <div className="text-center">{item.name}</div>
          </div>
        ))}
    </div>
  );
}

export default MovieDetailsPage2;
