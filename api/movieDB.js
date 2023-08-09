import axios from "axios";
import { apikey } from "../constants";

// endpoints

const apiBaseUrl = "https://api.themoviedb.org/3/";

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

// movie details
const movieDetailsEndPoint = (id) =>
  id ? `${apiBaseUrl}movie/${id}?api_key=${apikey}` : null;

const movieCreditsEndPoint = (id) =>
  `${apiBaseUrl}movie/${id}/credits?api_key=${apikey}`;

const movieSimilarEndPoint = (id) =>
  id ? `${apiBaseUrl}movie/${id}/similar?api_key=${apikey}` : null;

//   person details
const personDetailEndPoint = (id) =>
  id ? `${apiBaseUrl}person/${id}?api_key=${apikey}` : null;

const personMovieDetailEndPoint = (id) =>
  id ? `${apiBaseUrl}person/${id}/movie_credits?api_key=${apikey}` : null;

//   search movie
const searchMovieEndPoint = `${apiBaseUrl}search/movie?&api_key=${apikey}`;

const trendingMovieEndPoint = `${apiBaseUrl}trending/movie/day?api_key=${apikey}`;

const upComingMovieEndPoint = `${apiBaseUrl}movie/upcoming?api_key=${apikey}`;

const topRatedMovieEndPoint = `${apiBaseUrl}movie/top_rated?api_key=${apikey}`;

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const res = await axios.request(options);
    return res.data;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMovieEndPoint);
};

export const fetchUpComingMovies = () => {
  return apiCall(upComingMovieEndPoint);
};

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMovieEndPoint);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndPoint(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndPoint(id));
};

export const fetchMovieSimilars = (id) => {
  return apiCall(movieSimilarEndPoint(id));
};

export const fetchPersonDetail = (id) => {
  return apiCall(personDetailEndPoint(id));
};

export const fetchPersonMovieDetail = (id) => {
  return apiCall(personMovieDetailEndPoint(id));
};

export const fetchSearchMovie = (params) => {
  return apiCall(searchMovieEndPoint, params);
};
