import useDebounce from "hook/useDebounce";
import React, { createContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars

const Header = () => {
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  const searchChangeHandler = (e) => {
    const inputValue = e.target.value;
    setFilter(inputValue);
  };
  const filterDebounce = useDebounce(filter, 500);
  const handleClick = () => {
    navigate("/search", { state: { searchText: filterDebounce } });
  };

  return (
    <header className=" page-container header flex items-center justify-between gap-x-5 text-white py-10 mb-5 px-5">
      <div className="flex gap-11 font-extrabold text-2xl">
        <NavLink
          end
          to="/"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          Home
        </NavLink>

        <NavLink
          to="/popular"
          className={({ isActive }) => {
            return isActive ? "text-primary" : "";
          }}
        >
          Popular
        </NavLink>
        <NavLink
          to="/toptrending"
          className={({ isActive }) => {
            return isActive ? "text-primary" : "";
          }}
        >
          Top Trending
        </NavLink>
        <NavLink
          to="/tv-episodes"
          className={({ isActive }) => {
            return isActive ? "text-primary" : "";
          }}
        >
          Tv Episodes
        </NavLink>
      </div>
      <div className="flex items-center justify-between gap-x-5 ">

        {/* sign in */}
        <div className="flex gap-x-5">
          <NavLink
            to="/login"
            className={({ isActive }) => {
              return isActive ? "text-primary" : "";
            }}
          >
           Log in
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) => {
              return isActive ? "text-primary" : "";
            }}
          >
           Sign up
          </NavLink>
        </div>


      <div className="flex justify-center h-[50px]">
        <input
          type="text"
          className="w-[200px] h-[50px] rounded-l-lg p-2 outline-none bg-slate-800 text-white"
          placeholder="Type here to search..."
          onChange={searchChangeHandler}
        />
        <button
          onClick={handleClick}
          className="text-white p-6 bg-primary px-3 rounded-r-lg font-bold mb-16 items-center justify-center flex"
        >
          {" "}
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
    </header>
  );
};

export const Context = createContext();
export default Header;
