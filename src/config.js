export const fetcher = (...args) => fetch(...args).then((res) => res?.json());
export const api_key = "ee0dd0cc14c2393b4e8f705d7e706e61";
export const tmdb_url = "https://api.themoviedb.org/3/";
export const movie_db_url = "https://api.themoviedb.org/3/movie/";
export const tvdb_url = "https://api.themoviedb.org/3/tv/";
export const search_url = "https://api.themoviedb.org/3/search/movie?";

export const tmdb_api = {
  getMovieList: (type, page = 1) =>
    `${tmdb_url}/${type}?api_key=${api_key}&page=${page}`,
  photoUrl: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  SearchUrl: (query, page = 1) =>
    `${search_url}api_key=${api_key}&query=${query}&page=${page}`,
};
