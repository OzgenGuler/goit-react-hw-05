import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader/Loader";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await searchMovies(query);
        setMovies(response.data.results);
      } catch (error) {
        setError("Failed to fetch movies");
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.query.value.trim();
    if (!query) return;
    setSearchParams({ query: input });
    form.reset();
  };

  return (
    <main>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input name="query" type="text" placeholder="Search movies" />
        <button type="submit">Search Movies</button>
      </form>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default MoviesPage;
