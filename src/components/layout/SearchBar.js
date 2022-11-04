import { useRef, useState } from "react";
import useSWR from "swr";
import { api_key, fetcher } from "../../config";

const SearchBar = () => {
  // const [filter, setFilter] = useState("")
  const search_url = "https://api.themoviedb.org/3/search/movie?";
  const inputRef = useRef();
  const [url, setUrl] = useState(
    `${search_url}api_key=${api_key}&page=1&include_adult=false`
  );
  const { data } = useSWR(url, fetcher);
  const movies = data?.results || "";
  console.log(movies);
  const searchHandler = () => {
    setUrl(
      `${search_url}api_key=${api_key}&page=1&include_adult=false&query=${inputRef.current.value}`
    );
  };

  return (
    <div className="py-10 page-container">
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
    </div>
  );
};

export default SearchBar;
