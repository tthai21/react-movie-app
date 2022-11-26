import { useState } from "react";
import {onAuthStateChanged} from "firebase/auth"
import { auth } from "../firebase/firebase-config";

const { createContext, useContext } = require("react");

const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState(null);
  onAuthStateChanged(auth, (currentUser) => {
    setUserInfo(currentUser);
  });
  const value = { userInfo, setUserInfo };
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be use inside Provider");
  return context;
}

export { AuthProvider, useAuth };
