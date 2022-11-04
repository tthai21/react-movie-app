import React, { Fragment } from "react";
import MovieList from "components/movies/MovieList";
import { api_key, tmdb_url } from "config";

const HomePage = () => {
  return (
    <Fragment>
      {/* Now Playing */}
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10  text-3xl font-body">
          Now playing
        </h2>
        <MovieList
          url={`${tmdb_url}now_playing?api_key=${api_key}`}
        ></MovieList>
      </section>
      {/* Top play */}
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10  text-3xl font-body">
          Top Play
        </h2>
        <MovieList
          url={`${tmdb_url}top_rated?api_key=${api_key}`}
        ></MovieList>
      </section>
      {/* Trending */}
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10  text-3xl font-body">
          Top Trending
        </h2>
        <MovieList
          url={`${tmdb_url}popular?api_key=${api_key}`}
        ></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
