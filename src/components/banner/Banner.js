import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdb_api } from "../../config";
import Button from "../button/Button";

const Banner = () => {
  let moviesUrl = `${tmdb_api.SearchUrl("Avenger",1)}`;
  const { data } = useSWR(moviesUrl, fetcher);
  const movies = data?.results || [];   

  return (    
    <section className="banner lg:h-[800px] sm:h-[600px] h-[250px]  page-container mb-20 overflow-hidden ">
      <Swiper
        grabCursor={true}
        slidesPerView={"auto"}
        className="h-full rounded-lg "
      >
        {movies?.length > 0 &&
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <BannerItem
                id={movie.id}
                movie={movie}
                url={tmdb_api.photoUrl(movie.backdrop_path)}               
                title={movie.title}
              ></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ title, url, id }) {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate(`/movie/${id}`);
  };
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.25)] rounded-lg bg-opacity-10"></div>
      <img src={url} alt="" className="w-full h-full rounded-lg object-fill " />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="movie-tag">Advance</span>
          <span className="movie-tag">Action</span>
          <span className="movie-tag">Drama</span>
        </div>
        <Button bg-color="primary" onCLick={navigateHandler}>
          Watch Now
        </Button>
      </div>
    </div>
  );
}

export default Banner;
