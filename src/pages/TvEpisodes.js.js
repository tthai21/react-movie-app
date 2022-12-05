import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import MovieCard from "../components/movies/MovieCard";
import { api_key, fetcher, tmdb_api } from "config";
import { tmdb_url } from "config";
import { useAuth } from "../contexts/auth-context";

const itemsPerPage = 20;

const TvEpisodes = () => {
  // Pagination
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [url, setUrl] = useState(
    `${tmdb_url}/tv/popular?api_key=${api_key}&language=en-US&page=${nextPage}`
  );

  useEffect(() => {
    setUrl(
      `${tmdb_url}tv/popular?api_key=${api_key}&language=en-US&page=${nextPage}`
    );
  }, [nextPage]);
  const { data, error } = useSWR(url, fetcher);

  useEffect(() => {
    if (!data || !data.total_results) return;
    setCurrentItems(data);
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    window.scrollTo(0, 0)
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (currentItems && currentItems.results) setMovies(currentItems.results);
  }, [currentItems]);

  const loading = !currentItems && !error;
  const { favoriteTv } = useAuth();
  const checkFavoriteTvId = favoriteTv?.map((item) => item.id);
  const moviesNew = movies.map((item) => ({ ...item, favorite: false }));
  const CheckedMovie = moviesNew.map((item) => ({
    ...item,
    favorite: checkFavoriteTvId?.includes(item.id),
  }));
  if (!currentItems) return;

  return (
    <div className="py-10 lg:page-container text-white mx-auto w-full">
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 animate-spin mx-auto"></div>
      )}
      <div className="w-full mb-10">
        <h1 className="text-center text-3xl">Tv Episodes</h1>
      </div>
      <div className=" sm:grid lg:grid xl:grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10 flex flex-col items-center">
        {!loading &&
          CheckedMovie?.length > 0 &&
          CheckedMovie?.map((item) => (
            <MovieCard
              id={item.id}
              key={item.id}
              title={item.name}
              year={item.first_air_date}
              url={
                tmdb_api.photoUrl(item.backdrop_path) ||
                tmdb_api.photoUrl(item.poster_path)
              }
              rate={item.vote_average}
              path={item.backdrop_path}
              type="tv"
              favorite={item.favorite}
            ></MovieCard>
          ))}
      </div>

      {/* Pagination react */}
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default TvEpisodes;
