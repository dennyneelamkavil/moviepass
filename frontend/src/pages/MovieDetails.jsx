import { useNavigate, useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../api/movieSlice";
import { useEffect, useState } from "react";
import formatTime from "../utils/formatTime";
import { useSelector } from "react-redux";
import ErrorComponent from "./ErrorPage";
import { toast } from "react-toastify";

export default function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isExpanded, setIsExpanded] = useState(false);
  const { data, refetch } = useGetMovieByIdQuery(movieId);
  const movie = data?.movie || {};

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleClick = (showtimeID) => {
    if (!user) {
      navigate("/login");
      toast.info("Please login to book tickets");
      return;
    } else {
      navigate(`/movies/book/${showtimeID}`);
    }
  };

  if (!movie) {
    return (
      <ErrorComponent message="Movie not found. Please go back and try again." />
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row justify-center items-center gap-8">
      <div className="card bg-base-100 shadow-xl w-full lg:w-1/2">
        <figure>
          <img
            src={movie?.image}
            alt={movie?.title}
            className="w-full h-auto max-h-96 object-contain"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{movie?.title}</h2>
          <div className="flex justify-between">
            <p className={`${isExpanded ? "" : "line-clamp-5"}`}>
              {movie?.description}
            </p>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 mt-2 underline text-sm"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full">
        {movie?.trailerUrl ? (
          <div className="w-full h-96">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${movie.trailerUrl}`}
              title={`${movie?.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="text-center p-4">No trailer available</div>
        )}
        <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body">
            <div className="flex flex-col lg:flex-row justify-between items-center text-center">
              <div className="flex-1 flex items-center">
                <h2 className="text-lg font-semibold">Duration: </h2>
                <p>{movie?.duration} minutes</p>
              </div>
              <div className="flex-1 flex items-center">
                <h2 className="text-lg font-semibold">Genre: </h2>
                <p>{movie?.genre}</p>
              </div>
              {/* <div className="flex-1 flex items-center">
                <h2 className="text-lg font-semibold">Rating: </h2>
                <p>{movie?.rating}</p>
              </div> */}
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-center text-center">
              <div className="flex-1 flex items-center">
                <h2 className="text-lg font-semibold">Director: </h2>
                <p>{movie?.director}</p>
              </div>
              <div className="flex-1 flex items-center">
                <h2 className="text-lg font-semibold">Writers: </h2>
                <p>{movie?.writers}</p>
              </div>
              <div className="flex-1 flex items-center">
                <h2 className="text-lg font-semibold">Stars: </h2>
                <p>{movie?.stars}</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-5">Available Showtimes</h3>
            <ul className="space-y-2">
              {movie?.showtimes?.map((showtime) => (
                <li key={showtime?._id} className="flex justify-between">
                  <span>{showtime?.theaterID?.name}</span>
                  <span>{new Date(showtime?.date).toDateString()}</span>
                  <span>{formatTime(showtime?.time)}</span>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleClick(showtime?._id)}
                  >
                    Book
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
