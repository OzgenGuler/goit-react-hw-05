import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader/Loader";
import { toast } from "react-toastify";
import CSS from "../App.module.css";

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
        const results = response.data.results;
        if (response.data.results.length === 0) {
          toast.info("No movies found for your search query.");
        } else {
          toast.success(`Found ${response.data.results.length} movies.`);
        }
        setMovies(results);
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
    if (!input) return;
    setSearchParams({ query: input });
    form.reset();
  };

  return (
    <main className={CSS.movies_page}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit} className={CSS.search_form}>
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
