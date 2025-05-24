import { useState, useEffect, useRef } from "react";
import {
  useParams,
  NavLink,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";
import { getMovieDetails, getImageUrl } from "../api/tmdb";
import Loader from "../components/Loader/Loader";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await getMovieDetails(movieId);
        setMovie(response.data);
      } catch (error) {
        setError("Failed to fetch movie details");
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No movie details found.</p>;

  return (
    <main>
      <Link to={backLinkRef.current} className="back_link">
        Go back
      </Link>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      {movie.poster_path && (
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          width="200"
        />
      )}
      <ul>
        <li>
          <NavLink to="cast" className="navlink">
            cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className="navlink">
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;
