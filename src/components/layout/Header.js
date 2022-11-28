import { signOut } from "firebase/auth";
import useDebounce from "hook/useDebounce";
import React, { createContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { ReactComponent as ReactLogo } from "../../logo/logo.svg";
import Logo2 from "../../logo/logodesktop/logoDesktop.svg";
import Button from "../button/Button";

const Header = ({ userInfo }) => {
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const searchChangeHandler = (e) => {
    const inputValue = e.target.value;
    setFilter(inputValue);
  };
  const filterDebounce = useDebounce(filter, 500);
  const handleClick = (e) => {
    e.preventDefault();
    setFilter("");
    navigate("/search", { state: { searchText: filterDebounce } });
  };
  const [isNavOpen, setIsNavOpen] = useState(false);

  const [openUserInfo, setOpenUserInfo] = useState(false);

  const handleOpen = () => {
    setOpenUserInfo(!openUserInfo);
  };
  const logOutHandler = () => {
    signOut(auth);
    setIsNavOpen(false);
    setOpenUserInfo(false);
  };

  return (
    <>
      {/* Mobile */}
      <div className="flex items-center justify-between border-b border-gray-400 py-8 xl:hidden">
        <ReactLogo
          className="xl:hidden w-[180px]"
          onClick={() => navigate("/")}
        ></ReactLogo>
        <nav>
          <section className="MOBILE-MENU flex xl:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
            >
              <span className="block h-0.5 w-8 animate-pulse bg-gray-300"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-300"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-300"></span>
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
              <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-center min-h-[250px] text-white text-lg">
                {userInfo && (
                  <>
                    <li className="mx-2 text-primary">Welcome {userInfo.email}</li>
                  </>
                )}
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
                {/* Account info */}
                {userInfo && (
                  <>
                    <li className="border-b border-gray-400 my-8 uppercase">
                      <NavLink
                        end
                        onClick={() => setIsNavOpen(false)}
                        to="/favorite"
                        className={({ isActive }) =>
                          isActive ? "text-primary" : ""
                        }
                      >
                        Favorite Movies
                      </NavLink>
                    </li>
                  </>
                )}
                {userInfo ? (
                  <div>
                    <Button onClick={logOutHandler}>Log out</Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-white text-lg">
                    <div className="border-b border-gray-400 my-8 uppercase">
                      <NavLink
                        onClick={() => setIsNavOpen(false)}
                        to="/login"
                        className={({ isActive }) => {
                          return isActive ? "text-primary" : "";
                        }}
                      >
                        Log in
                      </NavLink>
                    </div>
                    <div className="border-b border-gray-400 my-8 uppercase">
                      <NavLink
                        onClick={() => setIsNavOpen(false)}
                        to="/signup"
                        className={({ isActive }) => {
                          return isActive ? "text-primary" : "";
                        }}
                      >
                        Sign up
                      </NavLink>
                    </div>
                  </div>
                )}
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
      <header className=" page-container header flex items-center xl:justify-between gap-x-2 text-white py-10 mb-5 px-4 justify-center ">
        <div className="flex items-center justify-between  py-8">
          <img
            onClick={() => navigate("/")}
            srcSet={Logo2}
            alt=""
            className="w-[150px] hidden xl:block cursor-pointer"
          />
        </div>

        <div
          className="hidden xl:flex xl:gap-11 font-extrabold xl:text-xl "
          onClick={() => setOpenUserInfo(false)}
        >
          <NavLink
            end
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary" : "hover:text-primary"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/popular"
            className={({ isActive }) => {
              return isActive ? "text-primary" : "hover:text-primary";
            }}
          >
            Popular
          </NavLink>
          <NavLink
            to="/toptrending"
            className={({ isActive }) => {
              return isActive ? "text-primary" : "hover:text-primary";
            }}
          >
            Top Trending
          </NavLink>
          <NavLink
            to="/tv-episodes"
            className={({ isActive }) => {
              return isActive ? "text-primary" : "hover:text-primary";
            }}
          >
            Tv Episodes
          </NavLink>
        </div>
        <div className=" xl:flex xl:items-center xl:justify-between lg:gap-x-5 ">
          {/* UserInfo */}
          <div className="hidden xl:block xl:relative">
            {userInfo ? (
              <div>
                <span
                  className="mx-2 cursor-pointer text-lg text-primary"
                  onClick={handleOpen}
                >
                  {userInfo.email}
                </span>
                {openUserInfo ? (
                  <ul className="menu absolute right-0 p-2  ">
                    <li className="menu-item">
                      <button>Account info</button>
                    </li>
                    <li className="menu-item">
                      <button
                        onClick={() => {
                          handleOpen();
                          navigate("/favorite");
                        }}
                      >
                        Favorite
                      </button>
                    </li>
                    <li className="menu-item " onClick={logOutHandler}>
                      <button className="text-primary font-bold">
                        Log out
                      </button>
                    </li>
                  </ul>
                ) : null}
              </div>
            ) : (
              <div className="hidden lg:flex lg:gap-x-5">
                <NavLink
                  to="/login"
                  className={({ isActive }) => {
                    return isActive ? "text-primary" : "hover:text-primary";
                  }}
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => {
                    return isActive ? "text-primary" : "hover:text-primary";
                  }}
                >
                  Sign up
                </NavLink>
              </div>
            )}
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
