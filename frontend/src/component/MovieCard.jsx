import { useNavigate } from "react-router-dom";
import { useGetAllMoviesQuery } from "../api/movieSlice";
import { useEffect } from "react";

export default function MovieCard() {
  const { data: moviesData = {}, refetch } = useGetAllMoviesQuery();
  const movies = moviesData.movies || [];
  const navigate = useNavigate();

  const handleClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-center gap-4">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="card bg-base-100 w-96 shadow-xl cursor-pointer"
            onClick={() => handleClick(movie._id)}
          >
            <figure>
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-auto max-h-96 object-contain"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{movie.title}</h2>
              <p className="line-clamp-3">{movie.description}</p>
              {/* <p>Rating: {movie.rating}</p> */}
              <p>Duration: {movie.duration} minutes</p>
              <p>Genre: {movie.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
