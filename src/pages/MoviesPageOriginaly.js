import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import MovieCard from "../components/movies/MovieCard";
import { api_key, fetcher, search_url, tmdb_api, tmdb_url } from "config";

const itemsPerPage = 20;

const MoviesPage = () => {
  // Pagination
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [url, setUrl] = useState(
    `${tmdb_api.getMovieList("popular", nextPage)}`
  );
  const inputRef = useRef();

  useEffect(() => {
    setUrl(`${tmdb_url}popular?api_key=${api_key}&page=${nextPage}`);
  }, [nextPage]);
  const { data, error } = useSWR(url, fetcher);

  useEffect(() => {
    if (!data || !data.total_results) return;
    setCurrentItems(data);
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (currentItems && currentItems.results) setMovies(currentItems.results);
  }, [currentItems]);

  if (!currentItems) return;
  const loading = !currentItems && !error;
  const searchHandler = () => {
    setUrl(
      `${search_url}api_key=${api_key}&page=${nextPage}&include_adult=false&query=${inputRef.current.value}&page=${currentItems}`
    );
  };

  return (
    <div className="py-10 page-container text-white">
      <div className="flex justify-center">
        <div>
          <input
            ref={inputRef}
            type="text"
            className="w-[500px] rounded-lg p-2 outline-none bg-slate-800 text-white"
            placeholder="Search..."
          ></input>
        </div>
        <button
          onClick={searchHandler}
          className="text-white ml-5 p-2 bg-primary px-3 rounded-lg font-bold mb-16"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 animate-spin mx-auto"></div>
      )}
      <div className=" grid grid-cols-4 gap-5 mb-10">
        {!loading &&
          movies?.length > 0 &&
          movies.map((item) => (
            <MovieCard
              id={item.id}
              key={item.id}
              title={item.title}
              year={item.release_date}
              url={tmdb_api.photoUrl(item.poster_path)}
              rate={item.vote_average}
            ></MovieCard>
          ))}
      </div>

      {/* Pagination react */}
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviesPage;
