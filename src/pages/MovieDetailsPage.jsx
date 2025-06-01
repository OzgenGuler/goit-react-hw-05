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
import Css from "../App.module.css";

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

  const { title, overview, genres, vote_average, poster_path } = movie;

  return (
    <main className={Css.movie_details_page}>
      <Link to={backLinkRef.current} className={Css.back_link}>
        ◀ Go Back
      </Link>
      <div className={Css.movie_details_header}>
        <div className={Css.movie_details_info}>
          {poster_path && (
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              width="200"
              className={Css.movie_poster}
            />
          )}
        </div>
        <div className={Css.movie_details_text}>
          <h2>
            {title} ({new Date(movie.release_date).getFullYear()})
          </h2>
          <p>
            <strong>User Score:</strong> {Math.round(vote_average * 10)}%
          </p>

          <h3>Overview</h3>
          <p>{overview}</p>

          <h3>Genres</h3>
          <p>
            {genres && genres.length > 0
              ? genres.map((genre) => genre.name).join(", ")
              : "No genres available."}
          </p>
        </div>
      </div>
      <hr />
      <ul className={Css.additional_info_list}>
        <h4 className={Css.additional_info_title}>Additional Information</h4>
        <li className={Css.additional_info_item}>
          <NavLink to="cast" className={Css.navlink}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={Css.navlink}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <hr />
      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;
