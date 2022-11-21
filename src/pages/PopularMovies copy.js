
import { fetcher, tmdb_api } from "config";
import Button from "../components/button/Button";
import useSWRInfinite from "swr/infinite";
import { movie_db_url } from "config";
import { api_key } from "config";
import MovieCard from "components/movies/MovieCard";



const itemsPerPage = 20;

const PopularMovies = () => {   
  const url = `${movie_db_url}popular?api_key=${api_key}&page=1`;
  console.log("🚀 ~ file: PopularMovies.js ~ line 14 ~ PopularMovies ~ url", url)

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
    );

   
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
  isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);
  

  
  
  const loading = !data && !error;
  return (
    <div className="py-10 lg:page-container text-white mx-auto w-full">      
    {loading && (
      <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 animate-spin mx-auto"></div>
    )}
    <div className="w-full mb-10"><h1 className="text-center text-3xl">Popular Movies</h1></div>
    <div className=" lg:grid xl:grid lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10 flex flex-col items-center">
      {!loading &&
        movies?.length > 0 &&
        movies.map((item) => (
          <MovieCard
            id={item.id}
            key={item.id}
            title={item.title}
            year={item.release_date}
            url={tmdb_api.photoUrl(item.backdrop_path)}
            rate={item.vote_average}
            type="movie"
          ></MovieCard>
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

    </div>
  );
};


export default PopularMovies;
