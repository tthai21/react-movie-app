import FavoriteSlice from "components/movies/FavoriteSlice";
import { useAuth } from "contexts/auth-context";

const Favorite = () => {
  const { favoriteMovie, favoriteTv } = useAuth();

  return (
    <div className="page-container mt-[100px]">
      <h1 className="text-white mb-20 text-4xl font-extrabold">
        Favorite Movies
      </h1>
      <FavoriteSlice data={favoriteMovie} type="movie"></FavoriteSlice>
      <h1 className="text-white mb-20 text-4xl font-extrabold">Favorite Tv</h1>
      <FavoriteSlice data={favoriteTv} type="tv"></FavoriteSlice>
    </div>
  );
};

export default Favorite;
