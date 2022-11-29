import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { api_key, fetcher, movie_db_url, tmdb_api } from "../../config";
import Button from "../button/Button";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import { useAuth } from "contexts/auth-context";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";

SwiperCore.use([Autoplay, Pagination, Navigation]);

const Banner = () => {
  const { userInfo } = useAuth();

  let moviesUrl = `${movie_db_url}upcoming?api_key=${api_key}`;
  const { data } = useSWR(moviesUrl, fetcher);
  const movies = data?.results || [];
  if (movies.backdrop_path) return;

  return (
    <section className="banner lg:h-[800px] sm:h-[600px] h-[250px]  page-container mb-20 overflow-hidden ">
      <Swiper
        grabCursor={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper h-full rounded-lg"
      >
        {movies?.length > 0 &&
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <BannerItem
                userInfo={userInfo}
                id={movie.id}
                movie={movie}
                url={
                  tmdb_api.photoUrl(movie.backdrop_path) ||
                  tmdb_api.photoUrl(movie.poster_path)
                }
                path={movie.backdrop_path || movie.poster_path}
                title={movie.title}
                rate={movie.vote_average}
                favoriteYear={new Date(movie.release_date).getFullYear()}
              ></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ title, url, id, path, rate, year, userInfo = null }) {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate(`/movie/${id}`);
  };

  const addFavoriteHandler = async () => {
    const userRef = collection(
      db,
      "user",
      auth.currentUser.email,
      "favorite_movie"
    );
    await addDoc(userRef, {
      id,
      title,
      path,
      rate,
      year: `${new Date(year).getFullYear()}`,
      isFavorite: true,
    });
  };
  return (
    
      <div className="w-full h-full rounded-2xl relative">
        <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.25)] rounded-2xl bg-opacity-10"></div>
        <img
          src={url}
          alt=""
          className="w-full h-full rounded-2xl object-fill "
        />
        <div className="absolute left-5 bottom-5 w-full text-white">
          <h2 className="font-bold text-3xl mb-5">{title}</h2>
          <div className="flex items-center gap-x-3 mb-8">
            <span className="movie-tag">Advance</span>
            <span className="movie-tag">Action</span>
            <span className="movie-tag">Drama</span>
          </div>
          <div className="flex gap-x-5">
            <Button
              bg-color="primary"
              className="max-w-[200px]"
              onCLick={navigateHandler}
            >
              Watch Now
            </Button>
            {userInfo && (
              <Button
                bg-color="primary"
                className="max-w-[200px]"
                onCLick={addFavoriteHandler}
              >
                Add To Watch List
              </Button>
            )}
          </div>
        </div>
      </div>
   
  );
}

export default Banner;
