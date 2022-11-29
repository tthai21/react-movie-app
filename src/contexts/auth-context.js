

const { createContext, useContext, useState } = require("react");

const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  const [favoriteTv, setFavoriteTv] = useState([]); 
  
 

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
