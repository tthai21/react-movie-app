import React, { useEffect, useState } from "react";
import MovieCard, { MovieCardSkeleton } from "../components/movies/MovieCard";
import { fetcher, tmdb_api } from "config";
import { v4 } from "uuid";
import Button from "../components/button/Button";
import useSWRInfinite from "swr/infinite";
// import useDebounce from "../hook/useDebounce";
import { useLocation } from "react-router-dom";

const itemsPerPage = 20;

const MoviesPageLoadMore = () => {   
  const {state} = useLocation();
  const {searchText} = state
  
  // const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdb_api.getMovieList("popular"));
  // const filterDebounce = useDebounce(filter, 500);

  // get value from input
  // const handleFilterChange = (e) => {
  //   setFilter(e.target.value);
  // };

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
    );

   
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
  isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);
  
  useEffect(() => {
    if (searchText) {
      setUrl(tmdb_api.SearchUrl(searchText));
    } else {
      setUrl(tmdb_api.getMovieList("popular"));
    }
  }, [searchText]);
  
  
  const loading = !data && !error;
  return (
    <div className="py-10 page-container text-white">
      {/* <div className="flex justify-center mb-10">
        <div className="flex justify-center">
          <input
            type="text"
            className="w-[500px] rounded-l-lg p-2 outline-none bg-slate-800 text-white"
            placeholder="Type here to search..."
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 bg-primary text-white rounded-r-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div> */}
      {/* {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin"></div>
      )} */}
      {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard  id={item.id}
              key={item.id}
              title={item.title}
              year={item.release_date}
              url={tmdb_api.photoUrl(item.poster_path)}
              rate={item.vote_average}></MovieCard>
          ))}
      </div>
      <div className="mt-10 text-center">
        <Button
          onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
          disabled={isReachingEnd}
          className={`${isReachingEnd ? "bg-slate-300" : ""}`}
        >
          Load more
        </Button>
      </div>
      {/* <div className="mt-10">
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
      </div> */}
    </div>
  );
};


export default MoviesPageLoadMore;
