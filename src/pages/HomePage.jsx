import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";
import CSS from "../App.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      // setLoading(true);
      try {
        const response = await fetchTrendingMovies();
        setMovies(response.data.results);
      } catch (error) {
        setError("Failed to fetch trending movies");
        console.error("Error fetching trending movies:", error);
      } finally {
        // setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <main className={CSS.home_page}>
      <h1>Trending Movies</h1>
      {/* {loading && <Loader />} */}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default HomePage;
