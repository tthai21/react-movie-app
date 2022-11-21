import useDebounce from "hook/useDebounce";
import React, { createContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ReactComponent as ReactLogo } from "../../logo/logo.svg";

// eslint-disable-next-line no-unused-vars

const Header = () => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const searchChangeHandler = (e) => {
    const inputValue = e.target.value;
    setFilter(inputValue);
  };
  const filterDebounce = useDebounce(filter, 500);
  const handleClick = (e) => {
e.preventDefault()
setFilter("")
    navigate("/search", { state: { searchText: filterDebounce } });
  };
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      {/* Mobile */}
      <div className="flex items-center justify-between border-b border-gray-400 py-8 lg:hidden">
        <ReactLogo
          className="w-[180px]"
          onClick={() => navigate("/")}
        ></ReactLogo>
        <nav>
          <section className="MOBILE-MENU flex lg:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
            >
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              <div
                className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)}
              >
                <svg
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="white"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px] text-white text-lg">
                <li className="border-b border-gray-400 my-8 uppercase">
                  <NavLink
                    end
                    onClick={() => setIsNavOpen(false)}
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "text-primary" : ""
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <NavLink
                    to="/popular"
                    className={({ isActive }) => {
                      return isActive ? "text-primary" : "";
                    }}
                    onClick={() => setIsNavOpen(false)}
                  >
                    Popular
                  </NavLink>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <NavLink
                    onClick={() => setIsNavOpen(false)}
                    to="/toptrending"
                    className={({ isActive }) => {
                      return isActive ? "text-primary" : "";
                    }}
                  >
                    Top Trending
                  </NavLink>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <NavLink
                    onClick={() => setIsNavOpen(false)}
                    to="/tv-episodes"
                    className={({ isActive }) => {
                      return isActive ? "text-primary" : "";
                    }}
                  >
                    Tv Episodes
                  </NavLink>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <NavLink
                    onClick={() => setIsNavOpen(false)}
                    to="/signup"
                    className={({ isActive }) => {
                      return isActive ? "text-primary" : "";
                    }}
                  >
                    Sign up
                  </NavLink>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase">
                  <NavLink
                    onClick={() => setIsNavOpen(false)}
                    to="/login"
                    className={({ isActive }) => {
                      return isActive ? "text-primary" : "";
                    }}
                  >
                    Log in
                  </NavLink>
                </li>
              </ul>
            </div>
          </section>
        </nav>
        <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
        height: 100vh;    
        background: rgb(15 23 42 / var(--tw-bg-opacity));
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
      </div>

      {/* Desktop */}
      <header className=" page-container header flex items-center lg:justify-between gap-x-5 text-white py-10 mb-5 px-5 justify-center">
        <div className="hidden lg:flex lg:gap-11 font-extrabold lg:text-xl">
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
        <div className="lg:flex lg:items-center lg:justify-between lg:gap-x-5 ">
          {/* sign in */}
          <div className="hidden lg:flex lg:gap-x-5">
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

          {/* Search-box */}
          <div className="page-container">
            <form className="flex justify-center h-[50px]">
              <input      
                value={filter}         
                type="text"
                className="w-[200px] h-[50px] rounded-l-lg p-2 outline-none bg-slate-800 text-white"
                placeholder="Type here to search..."
                onChange={searchChangeHandler}
              />
              <button
              disabled={!filter}
                onClick={handleClick}
                className="text-white p-6 h-[50px] bg-primary px-3 rounded-r-lg font-bold mb-16 items-center justify-center flex"
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
            </form>
          </div>
          {/* End-Search-Box */}
        </div>
      </header>
    </>
  );
};

export const Context = createContext();
export default Header;
