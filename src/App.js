import { Fragment, lazy, Suspense } from "react";
import Banner from "./components/banner/Banner";
import "swiper/scss";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import NotFound from "./components/layout/NotFound";
import PopularMovies from "pages/PopularMovies";
import Login from "pages/Login";
import SignupForm from "pages/Signup";
import TvEpisodes from "pages/TvEpisodes.js";
import SwiperCore, { Autoplay } from "swiper";
import { movie_db_url } from "config";
import { api_key } from "config";
import MovieCastDetailsPage from "pages/MovieCastDetailsPage";
import Footer from "components/layout/Footer";
import { useAuth } from "./contexts/auth-context";


// Dynamic import
const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));

function App() {
  const {userInfo} = useAuth() 
      console.log("🚀 ~ file: App.js ~ line 27 ~ App ~ userInfo", userInfo?.email)
 
  SwiperCore.use([Autoplay]);
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main userInfo={userInfo}></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/search" element={<SearchPage></SearchPage>}></Route>
            <Route
              path="/popular"
              element={<PopularMovies url = {`${movie_db_url}popular?api_key=${api_key}&page=1`}></PopularMovies>}>
              </Route>
            <Route path="/toptrending" element={<PopularMovies url = {`${movie_db_url}top_rated?api_key=${api_key}&page=1`}></PopularMovies>}></Route>
            <Route
              path="/tv-episodes"
              element={<TvEpisodes></TvEpisodes>}
            ></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signup" element={<SignupForm></SignupForm>}></Route>
            <Route
              path="/movie/:id"
              element={<MovieDetailsPage type="movie"></MovieDetailsPage>}
            ></Route>
            <Route
              path="/tv/:id"
              element={<MovieDetailsPage type="tv"></MovieDetailsPage>}
            ></Route>
            <Route
              path="/:personId"
              element={<MovieCastDetailsPage></MovieCastDetailsPage>}
            ></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Route>
        </Routes>
        <Footer></Footer>
      </Suspense>
    </Fragment>
  );
}

export default App;
