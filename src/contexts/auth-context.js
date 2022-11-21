import { useState } from "react";

const { createContext, useContext } = require("react");

const AuthContext = createContext();

function AuthProvider(props) {
    const [userInfo,setUserInfo] = useState({})
    const value = {userInfo,setUserInfo}
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be use inside Provider");
  return context;
}

export { AuthProvider, useAuth };
