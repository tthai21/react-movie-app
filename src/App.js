import { Fragment, lazy, Suspense, useState } from "react";
import Banner from "./components/banner/Banner";
import "swiper/scss";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import NotFound from "./components/layout/NotFound";
import PopularMovies from "pages/PopularMovies";
import Login from "pages/Login";
import SignupForm from "pages/Signup";
import TvEpisodes from "pages/TvEpisodes.js";
import TopRated from "pages/TopRated";
import SwiperCore, { Autoplay } from "swiper";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase-config";



// Dynamic import
const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPageLoadMore"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));

function App() {
  const [userInfo, setUserInfo] = useState(""); 
  onAuthStateChanged(auth, (currentUser) => {
    setUserInfo(currentUser);
  });
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
              element={<PopularMovies></PopularMovies>}
            ></Route>
            <Route path="/toptrending" element={<TopRated></TopRated>}></Route>
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
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
