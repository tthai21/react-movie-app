import { useAuth } from "contexts/auth-context";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import useDebounce from "hook/useDebounce";
import React, { createContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase-config";
import { ReactComponent as ReactLogo } from "../../logo/logo.svg";
import Logo2 from "../../logo/logodesktop/logoDesktop.svg";
import Button from "../button/Button";

const Header = () => {
  const { userInfo,
    setFavoriteMovie,
    setFavoriteTv,
    setUserInfo,
     } = useAuth();
  onAuthStateChanged(auth, (currentUser) => {
    setUserInfo(currentUser);
  });
  const userEmail = userInfo?.email;
  useEffect(() => {
    const docRef = doc(db, "user", String(userEmail));

    const TestUpdateFavoriteMovie = async () => {
      const res = await getDoc(docRef);
      const array = res?.data()?.favorite_movie;
      setFavoriteMovie(array);
    };
    const TestUpdateFavoriteTv = async () => {
      const res = await getDoc(docRef);
      const array = res?.data()?.favorite_tv;
      setFavoriteTv(array);
    };
    TestUpdateFavoriteMovie();
    TestUpdateFavoriteTv();
  }, [setFavoriteMovie, setFavoriteTv, userEmail]);

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
                    <li className="mx-2 text-primary">
                      Welcome {userInfo.email}
                    </li>
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

      {/* sidebar */}
      {userInfo ? (
        <div className="sticky top-20 mt-10 bg-transparent w-[400px] h-[800px] float-left hidden 3xl:block ">
          {userInfo && (
            <div className="flex flex-col items-start justify-center gap-y-10">
              <div className=" mx-2 font-extrabold text-3xl text-primary">
                Menu
              </div>
              <button className="flex items-center justify-start gap-x-2 text-2xl p-3 text-white font-bold rounded-lg  opacity-50 hover:opacity-100 hover:text-4xl transition-all">
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
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
                <span>Account Info</span>
              </button>
              <NavLink
                to="/favorite"
                className="flex items-center justify-start gap-x-2 text-2xl p-3 text-white font-bold rounded-lg  opacity-50 hover:opacity-100 hover:text-4xl transition-all"
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
                    d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
                  />
                </svg>

                <span>Favorite Movies</span>
              </NavLink>
              <button className="flex items-center justify-start gap-x-2 text-2xl p-3 text-white font-bold rounded-lg  opacity-50 hover:opacity-100 hover:text-4xl transition-all">
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
                    d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                <span>Favorite Shows</span>
              </button>
              <button className="flex items-center justify-start gap-x-2 text-2xl p-3 text-white font-bold rounded-lg  opacity-50 hover:opacity-100 hover:text-4xl transition-all">
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
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
                <span>Community</span>
              </button>
              <button className="flex items-center justify-start gap-x-2 text-2xl p-3 text-white font-bold rounded-lg  opacity-50 hover:opacity-100 hover:text-4xl transition-all">
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
                    d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
                  />
                </svg>
                <span>Help</span>
              </button>
              <button
                onClick={logOutHandler}
                className="flex items-center justify-start gap-x-2 text-2xl p-3 text-white font-bold rounded-lg  opacity-50 hover:opacity-100 hover:text-4xl transition-all"
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
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                <span>Log Out</span>
              </button>
              <div className="inline-block gap-x-3 items-center text-white text-xl mt-[70px]">
                <div className="w-10 h-10 rounded-full flex items-center justify-between gap-x-3">
                  <img
                    src="https://media.istockphoto.com/id/1366990539/photo/a-cute-domestic-tabby-kitten-with-a-white-chest-looks-sadly-at-the-camera.jpg?s=612x612&w=is&k=20&c=E_HRqtGDxwmRWnkqD7h7YPrtAD3uOpe6D12WGJPCFjY="
                    alt=""
                    className="w-10 h-10 object-cover rounded-full shrink-0"
                  />
                  <span>{userInfo.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="sticky top-20 mt-10 bg-transparent w-[400px] h-[800px] float-left hidden ">
          {userInfo && (
            <div className="flex flex-col items-start justify-center gap-y-10">
              <div className=" mx-2 font-extrabold text-3xl text-primary">
                Menu
              </div>
              <button className="flex items-center justify-start gap-x-2 text-2xl p-3 text-white font-bold rounded-lg  opacity-50 hover:opacity-100 hover:text-4xl transition-all">
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
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
                <span>Account Info</span>
              </button>
              <NavLink
                to="/favorite"
                className="flex items-center justify-start gap-x-2 text-2xl p-3 text-white font-bold rounded-lg  opacity-50 hover:opacity-100 hover:text-4xl transition-all"
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
                    d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
                  />
                </svg>

                <span>Favorite Movies</span>
              </NavLink>
              <button className="flex items-center justify-start gap-x-2 text-2xl p-3 text-white font-bold rounded-lg  opacity-50 hover:opacity-100 hover:text-4xl transition-all">
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
                    d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
                <span>Favorite Shows</span>
              </button>
              <button className="flex items-center justify-start gap-x-2 text-2xl p-3 text-white font-bold rounded-lg  opacity-50 hover:opacity-100 hover:text-4xl transition-all">
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
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                  />
                </svg>
                <span>Community</span>
              </button>
              <button className="flex items-center justify-start gap-x-2 text-2xl p-3 text-white font-bold rounded-lg  opacity-50 hover:opacity-100 hover:text-4xl transition-all">
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
                    d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
                  />
                </svg>
                <span>Help</span>
              </button>
              <button
                onClick={logOutHandler}
                className="flex items-center justify-start gap-x-2 text-2xl p-3 text-white font-bold rounded-lg  opacity-50 hover:opacity-100 hover:text-4xl transition-all"
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
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                <span>Log Out</span>
              </button>
              <div className="inline-block gap-x-3 items-center text-white text-xl mt-[70px]">
                <div className="w-10 h-10 rounded-full flex items-center justify-between gap-x-3">
                  <img
                    src="https://media.istockphoto.com/id/1366990539/photo/a-cute-domestic-tabby-kitten-with-a-white-chest-looks-sadly-at-the-camera.jpg?s=612x612&w=is&k=20&c=E_HRqtGDxwmRWnkqD7h7YPrtAD3uOpe6D12WGJPCFjY="
                    alt=""
                    className="w-10 h-10 object-cover rounded-full shrink-0"
                  />
                  <span>{userInfo.email}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {userInfo ? (
        <div className="m-x-4 sticky top-20 mt-10 bg-transparent w-[400px] h-[800px] float-right hidden 3xl:block"></div>
      ) : (
        <div className="m-x-4 sticky top-20 mt-10 bg-transparent w-[400px] h-[800px] float-right hidden"></div>
      )}
    </>
  );
};

export const Context = createContext();
export default Header;
