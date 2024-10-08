import {
  useGetAllMoviesQuery,
  useGetlatestmoviesQuery,
  useGetTrendingMoviesQuery,
} from "../api/movieSlice";
import Carousel from "./Carousel";
import MovieCard from "./MovieCard";

export default function UserDashboard() {
  const { data: moviesData = {} } = useGetAllMoviesQuery();
  const movies = moviesData.movies || [];

  const { data: movie2024 = {} } = useGetlatestmoviesQuery(2024);
  const movies2024 = movie2024.movies || [];

  const { data: movie2025 = {} } = useGetlatestmoviesQuery(2025);
  const movies2025 = movie2025.movies || [];

  const { data: trending = {} } = useGetTrendingMoviesQuery();
  const trendingMovies = trending.movies || [];

  return (
    <div className="bg-slate-100">
      <Carousel />
      <MovieCard
        movies={trendingMovies}
        heading={"Trending"}
        id={"trending"}
        style={"bg-slate-100"}
      />
      <MovieCard
        movies={movies2024}
        heading={"Latest Movies"}
        id={"latest"}
        style={"bg-red-100"}
      />
      <MovieCard
        movies={movies2025}
        heading={"Upcoming Movies"}
        id={"comingsoon"}
        style={"bg-blue-100"}
      />
      <MovieCard
        movies={movies}
        heading={"Movies"}
        id={"movies"}
        style={"bg-amber-100"}
      />
    </div>
  );
}
