import MovieCard, { MovieCardSkeleton } from "components/movies/MovieCard";
import { tmdb_api } from "config";
import React from "react";
import { useAuth } from "contexts/auth-context";
import { db } from "../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import Swiper from "swiper";
import "swiper/scss";

import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const FavoriteHelper = ({ type }) => {
  SwiperCore.use([Autoplay]);
  const { userInfo } = useAuth();
  const userEmail = userInfo?.email;
  const [data, setData] = useState([]);

  console.log(`favorite_${type}`);

  useEffect(() => {
    let favorite = [];
    const TestUpdateFavorite = async () => {
      const userRef = collection(
        db,
        "user",
        String(userEmail),
        `favorite_${type}`
      );
      const res = await getDocs(userRef);
      res.docs.forEach((doc) => {
        favorite.push({
          id: doc.id,
          ...doc.data(),
        });
        setData(favorite);
      });
    };
    TestUpdateFavorite();
  }, [type, userEmail]);
  const isLoading = !data;
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
          {data.length > 0 &&
            data.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  year={item.year}
                  url={
                    tmdb_api.photoUrl(item.path) ||
                    tmdb_api.photoUrl(item.poster_path)
                  }
                  rate={item.rate}
                  type="movie"
                  isFavorite={item.isFavorite}
                ></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
    //       <MovieCard
    //         id={item.id}
    //         key={item.id}
    //         title={item.title}
    //         year={item.year}
    //         url={
    //           tmdb_api.photoUrl(item.path) ||
    //           tmdb_api.photoUrl(item.poster_path)
    //         }
    //         rate={item.rate}
    //         type="movie"
    //         isFavorite={item.isFavorite}
    //       ></MovieCard>
    //     ))}
    // </div>
    // </div>
  );
};

export default FavoriteHelper;
