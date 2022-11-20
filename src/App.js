import { Fragment, lazy, Suspense } from "react";
import Banner from "./components/banner/Banner";
import "swiper/scss";
import { Route, Routes } from "react-router-dom";
import Main from "./components/layout/Main";
import NotFound from "./components/layout/NotFound";
import PopularMovies from "pages/PopularMovies";
import Login from "pages/Login";
import TopTrending from "pages/TopTrending";
import SignupForm from "pages/Signup";
import TvEpisodes from "pages/TvEpisodes.js";


// import HomePage from "./pages/HomePage";
// import MoviesPage from "./pages/MoviesPage";
// import MovieDetailsPage from "./pages/MovieDetailsPage";

// Dynamic import
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPageLoadMore = lazy(() => import("./pages/MoviesPageLoadMore"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route
              path="/search"
              element={<MoviesPageLoadMore></MoviesPageLoadMore>}
            ></Route>
            <Route
              path="/popular"
              element={<PopularMovies></PopularMovies>}
            ></Route>
            <Route
              path="/toptrending"
              element={<TopTrending></TopTrending>}
            ></Route>
            <Route
              path="/tv-episodes"
              element={<TvEpisodes></TvEpisodes>}
            ></Route>
            <Route
              path="/login"
              element={<Login></Login>}
            ></Route>u
            <Route
              path="/signup"
              element={<SignupForm></SignupForm>}
            ></Route>

            <Route
              path="/movie/:id"
              element={<MovieDetailsPage type ="movie"></MovieDetailsPage>}
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
