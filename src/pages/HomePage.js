import React, { Fragment } from "react";
import HomePageList from "components/movies/HomePageList";
import { api_key, tmdb_url } from "config";

const HomePage = () => {
  return (
    <Fragment>
      {/* Now Playing */}
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10  text-3xl font-body">
          Now playing
        </h2>
        <HomePageList
          url={`${tmdb_url}movie/now_playing?api_key=${api_key}`}
        ></HomePageList>
      </section>
      {/* Top play */}
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10  text-3xl font-body">
          Top Play
        </h2>
        <HomePageList
          url={`${tmdb_url}movie/top_rated?api_key=${api_key}`}
        ></HomePageList>
      </section>
      {/* Trending */}
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10  text-3xl font-body">
          Top Trending
        </h2>
        <HomePageList
          url={`${tmdb_url}movie/popular?api_key=${api_key}`}
        ></HomePageList>
      </section>
    </Fragment>
  );
};

export default HomePage;
