import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const { createContext, useContext } = require("react");

const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  const [favoriteTv, setFavoriteTv] = useState([]); 
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

  const value = {
    userInfo,
    favoriteMovie,
    favoriteTv,
    setFavoriteMovie,
    setFavoriteTv,
    setUserInfo,
  };

  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be use inside Provider");
  return context;
}

export { AuthProvider, useAuth };
