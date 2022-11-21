import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import useSWR from "swr";
import { fetcher, tmdb_api } from "config";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { useParams } from "react-router-dom";
import { api_key } from "config";
import { tmdb_url } from "config";

const MovieList = ({ type }) => {
  const {id} = useParams()
  const listUrl=`${tmdb_url}${type}/${id}/similar?api_key=${api_key}&page=1`  
  const [movies, setMovies] = useState([]);
  const { data, error } = useSWR(listUrl, fetcher);  
 
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
      {!isLoading && (<Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard
                id={item.id}
                title={item.title||item.original_name
                }
                year={item.release_date || item.first_air_date
                }
                url={tmdb_api.photoUrl(item.backdrop_path)}
                rate={item.vote_average}
                type={type}
              ></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>)}
    </div>
  );
};

export default MovieList;
