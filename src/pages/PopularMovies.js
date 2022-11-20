import React, { useEffect,  useState } from "react";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import MovieCard from "../components/movies/MovieCard";
import { api_key, fetcher,   tmdb_api, tmdb_url } from "config";

const itemsPerPage = 20;

const PopularMovies = () => {
  // Pagination
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [url, setUrl] = useState(
    `${tmdb_url}/movie/popular?api_key=${api_key}&page=${nextPage}`
  );


  useEffect(() => {
    setUrl(`${tmdb_url}/movie/popular?api_key=${api_key}&page=${nextPage}`);
  }, [nextPage]);
  const { data, error } = useSWR(url, fetcher);
 if(data){
  

 }

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
       
      
  return (
    <div className="py-10 page-container text-white">
      
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
              type="movie"
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

export default PopularMovies;
