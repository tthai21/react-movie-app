import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2QiHnOrqNUjie7dvhUAocPZy91IAgvKM",
  authDomain: "react-movie-app-55068.firebaseapp.com",
  projectId: "react-movie-app-55068",
  storageBucket: "react-movie-app-55068.appspot.com",
  messagingSenderId: "65617146909",
  appId: "1:65617146909:web:99ec16b4d1d6d43065c2f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
export const db = getFirestore(app);

export const auth = getAuth(app);
