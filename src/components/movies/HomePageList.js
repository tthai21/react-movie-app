import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { fetcher, tmdb_api } from "config";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const HomePageList = ({ url }) => {
  SwiperCore.use([Autoplay]);
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(url, fetcher);

  const isLoading = !data && !error;

  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);

  return (
    <div className="movies-list text-white mb20">
      {isLoading && (
        <>
          <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
          </Swiper>
        </>
      )}
      {!isLoading && (
        <Swiper
          grabCursor={true}
          spaceBetween={40}
          slidesPerView={"auto"}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          className="mySwiper"
        >
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard
                  id={item.id}
                  title={item.title}
                  year={item.release_date || item.first_air_date}
                  url={tmdb_api.photoUrl(item.backdrop_path)}
                  rate={item.vote_average}
                  type="movie"
                ></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default HomePageList;
