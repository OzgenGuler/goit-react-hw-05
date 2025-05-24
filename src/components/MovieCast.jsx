import { useEffect, useState } from "react";
import { getMovieCast } from "../api/tmdb";
import { useParams } from "react-router-dom";
import Loader from "./Loader/Loader";

export const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const response = await getMovieCast(movieId);
        setCast(response.data.cast);
      } catch (error) {
        setError("Failed to fetch movie cast");
        console.error("Error fetching movie cast:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!cast.length === 0) return <p>No cast information available.</p>;

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              width="100"
            />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
