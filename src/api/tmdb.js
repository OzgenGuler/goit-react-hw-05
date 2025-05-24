import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDA5M2Y5MzcwZWVhYjYyZGRhZDEyMTViYTMzYzdkYyIsIm5iZiI6MTc0Mzc5MjUzNi41MTMsInN1YiI6IjY3ZjAyOTk4ZjVhODBhYTU0NTk5NTM5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kD8CV4_F8L2GVoP85qrIIvPuEascfTURrC1KNOeDj4Q";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_KEY,
    "Content-Type": "application/json;charset=utf-8",
  },
});

export const fetchTrendingMovies = () => {
  return axiosInstance.get("/trending/movie/day");
};

export const searchMovies = (query) => {
  return axiosInstance.get(`/search/movie`, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    },
  });
};

export const getMovieDetails = (movieId) => {
  return axiosInstance.get(`/movie/${movieId}`, {
    params: { language: "en-US" },
  });
};

export const getMovieCast = (movieId) => {
  return axiosInstance.get(`/movie/${movieId}/credits`);
};

export const getMovieReviews = (movieId) => {
  return axiosInstance.get(`/movie/${movieId}/reviews`, {
    params: { language: "en-US" },
  });
};

export const getImageUrl = (path) => `${IMAGE_BASE_URL}${path}`;
