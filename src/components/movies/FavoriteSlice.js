import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import {  tmdb_api } from "config";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import MovieCard from "./MovieCard";


SwiperCore.use([Autoplay, Pagination, Navigation]);

const FavoriteSlice = ({ data, type }) => {
  SwiperCore.use([Autoplay]);
  
  return (
    <div className="movies-list text-white mb20">     
     
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
          {data?.length > 0 &&
            data.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard
                docId={item.docId}
                id={item.id}
                key={item.id}
                title={item.title}
                year={item.year}
                url={
                  tmdb_api.photoUrl(item.path) ||
                  tmdb_api.photoUrl(item.poster_path)
                }
                rate={item.rate}
                type={type}
                isFavorite={item.isFavorite}
                ></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
     
    </div>
  );
};

export default FavoriteSlice;
