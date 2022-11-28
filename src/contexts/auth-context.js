import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";

const { createContext, useContext } = require("react");

const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  const [favoriteTv, setFavoriteTv] = useState([]);
  onAuthStateChanged(auth, (currentUser) => {
    setUserInfo(currentUser);
  }); 
  const userEmail = userInfo?.email
  useEffect(() => {
    let favoriteMovie = [];
    const TestUpdateFavorite = async () => {            
      const userRef = collection(
        db,
        "user",
        String(userEmail),
        `favorite_movie`
      );
      const res = await getDocs(userRef);
      res.docs.forEach((doc) => {
        favoriteMovie.push({
          docId: doc.id,
          ...doc.data(),
        });
        setFavoriteMovie(favoriteMovie);
      });
    };
    TestUpdateFavorite();
  }, [userEmail]);

  useEffect(() => {
    let favoriteTv = [];
    const TestUpdateFavorite = async () => {            
      const userRef = collection(
        db,
        "user",
        String(userEmail),
        `favorite_tv`
      );
      const res = await getDocs(userRef);
      res.docs.forEach((doc) => {
        favoriteTv.push({
          docId: doc.id,
          ...doc.data(),
        });
        setFavoriteTv(favoriteTv);
      });
    };
    TestUpdateFavorite();
  }, [userEmail]);
  
  const value = { userInfo, favoriteMovie,favoriteTv,setFavoriteMovie ,setFavoriteTv };
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be use inside Provider");
  return context;
}

export { AuthProvider, useAuth };
