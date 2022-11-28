import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Star } from "../../components/photo/star-7207.svg";
import Button from "../button/Button";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "./LoadingSkeleton";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import {  db } from "../../firebase/firebase-config";
import { useAuth } from "contexts/auth-context";


const MovieCard = (props) => {
  const { title, url, year, rate, id, type, path, isFavorite, docId } = props;
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate(`/${type}/${id}}`);
  };

  const { userInfo, setFavoriteMovie, setFavoriteTv, favoriteMovie,favoriteTv } = useAuth();
  const updateFavoriteMovie = [...favoriteMovie]
  const updateFavoriteTv = [...favoriteTv]


  const userRef = collection(
    db,
    "user",
    String(userInfo?.email),
    `favorite_${type}`
  );

  const addFavoriteHandler = async () => {
    await addDoc(userRef, {
      id,
      title,
      path,
      rate,
      year: `${new Date(year).getFullYear()}`,
      isFavorite: true,
    });
  };

  // Delete Doc
  const deleteRef = doc(
    db,
    "user",
    String(userInfo?.email),
    `favorite_${type}`,
    String(docId)
  );
  const removeFavoriteHandler = async () => {
    await deleteDoc(deleteRef);
    setFavoriteMovie(()=>updateFavoriteMovie.filter((movie)=>movie.docId !== docId))
    setFavoriteTv(()=>updateFavoriteTv.filter((tv)=>tv.docId !== docId))

  };
  return (
    <div className=" w-full movie-card flex flex-col rounded-lg p-3 bg-slate-800  text-white h-[500px] xl:w-[300px] select-none mb-10">
      <div className=" w-full h-[300px] object-contain ">
        <img
          src={url}
          alt=""
          className=" w-full h-[300px]  object-cover rounded-lg mb-5"
        />
      </div>
      <div className="flex flex-cols flex-1">
        <h3 className="text-white text-xl font-bold mb-3 flex items-center justify-center text-ellipsis ">
          {title}
        </h3>
      </div>
      <div className="flex justify-between text-sm opacity-50 mb-10">
        <span>{new Date(year).getFullYear()}</span>
        <div className="h-5 flex items-end justify-end">
          <Star className="flex items-end justify-end w-full h-full  mr-1 leading-none "></Star>
          <span className="">{rate}</span>
        </div>
      </div>
      <div className="flex gap-x-2 justify-around">
        <Button onCLick={navigateHandler} bgColor="primary">
          Watch Now
        </Button>
        {isFavorite ? (
          <Button bg-color="primary" onCLick={removeFavoriteHandler}>
            Remove
          </Button>
        ) : (
          <Button bg-color="primary" onCLick={addFavoriteHandler}>
            Watch Later
          </Button>
        )}
      </div>
    </div>
  );
};

function FallbackComponent() {
  return (
    <p className="bg-red-200 text-red-500">
      {" "}
      Something went wrong with this component
    </p>
  );
}

export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});

export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card flex flex-col mx-auto rounded-lg p-3 bg-slate-800  text-white h-full select-none mb-20 ">
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>
      <div className="flex flex-cols flex-1">
        <h3 className="text-white text-xl font-bold mb-3 flex items-center justify-center text-ellipsis ">
          <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
        </h3>
      </div>

      <div className="flex items-center justify-between text-sm opacity-50 mb-10">
        <span>
          <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
        </span>
        <div className="h-5 flex items-center justify-center">
          <Star className="w-full h-full inline-block mr-1 leading-none "></Star>
          <span className="items-center">
            <LoadingSkeleton width="50px%" height="0px"></LoadingSkeleton>
          </span>
        </div>
      </div>
      <LoadingSkeleton
        width="100%"
        height="40px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>
    </div>
  );
};
