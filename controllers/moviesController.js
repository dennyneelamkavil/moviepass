import MovieModel from "../models/movieModel.js";

export async function addNewMovie(req, res) {
  const movieDetails = req.body;
  movieDetails.createdBy = req.user.id;
  if (req.file) {
    movieDetails.image = req.file.path;
    movieDetails.imagePublicId = req.file.filename;
  }
  const movie = new MovieModel(movieDetails);
  await movie.save();
  res.status(201).json({ message: "Movie created successfully" });
}

export async function getAllMovies(req, res) {
  const movies = await MovieModel.find()
    .sort({ createdAt: -1, _id: 1 })
    .populate({
      path: "showtimes",
      populate: {
        path: "theaterID",
        model: "Theaters",
      },
    })
    .exec();
  res.status(200).json({ movies: movies });
}

export async function getMovieById(req, res) {
  const { id } = req.params;
  const movie = await MovieModel.findById(id)
    .populate({
      path: "showtimes",
      populate: {
        path: "theaterID",
        model: "Theaters",
      },
    })
    .exec();
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  res.status(200).json({ movie: movie });
}

export async function getLatestMovies(req, res) {
  const latestMovies = await MovieModel.find()
    .populate({
      path: "showtimes",
      populate: {
        path: "theaterID",
        model: "Theaters",
      },
    })
    .sort({ releaseYear: -1, createdAt: -1, _id: 1 })
    .limit(6)
    .exec();

  res.status(200).json({ movies: latestMovies });
}

export async function updateMovie(req, res) {
  const { id } = req.params;
  const newData = req.body;
  if (req.file) {
    newData.image = req.file.path;
    newData.imagePublicId = req.file.filename;
  }
  const movie = await MovieModel.findOneAndUpdate({ _id: id }, newData);
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  res.status(200).json({ message: "Movie updated successfully" });
}

export async function deleteMovie(req, res) {
  const { id } = req.params;
  const movie = await MovieModel.findByIdAndDelete(id);
  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  res.status(200).json({ message: "Movie deleted successfully" });
}
