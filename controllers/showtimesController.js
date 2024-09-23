import MovieModel from "../models/movieModel.js";
import ShowtimeModel from "../models/showtimeModel.js";
import TheaterModel from "../models/theaterModel.js";

export async function addNewShowtime(req, res) {
  const showtimeDetails = req.body;
  const showtime = new ShowtimeModel(showtimeDetails);
  await showtime.save();
  const movie = await MovieModel.findById(showtime.movieID);
  movie.showtimes.push(showtime._id);
  await movie.save();
  const theater = await TheaterModel.findById(showtime.theaterID);
  theater.showtimes.push(showtime._id);
  await theater.save();
  res
    .status(201)
    .json({ message: "Showtime created and movie updated successfully" });
}

export async function getShowtimeByTheater(req, res) {
  const { theaterID } = req.params;
  const showtimes = await ShowtimeModel.find({ theaterID })
    .populate("movieID")
    .populate("theaterID");
  res.status(200).json({ showtimes: showtimes });
}

export async function getAllShowtimes(req, res) {
  const showtimes = await ShowtimeModel.find()
    .populate("movieID")
    .populate("theaterID");
  res.status(200).json({ showtimes: showtimes });
}

export async function getShowtimeById(req, res) {
  const { id } = req.params;
  const showtime = await ShowtimeModel.findById(id)
    .populate("movieID")
    .populate("theaterID");
  if (!showtime) {
    return res.status(404).json({ message: "Showtime not found" });
  }
  res.status(200).json({ showtime: showtime });
}

export async function updateShowtime(req, res) {
  const { id } = req.params;
  const newData = req.body;
  const showtime = await ShowtimeModel.findOneAndUpdate({ _id: id }, newData);
  if (!showtime) {
    return res.status(404).json({ message: "Showtime not found" });
  }
  res.status(200).json({ message: "Showtime updated successfully" });
}

export async function deleteShowtime(req, res) {
  const { id } = req.params;
  const showtime = await ShowtimeModel.findById(id);
  if (!showtime) {
    return res.status(404).json({ message: "Showtime not found" });
  }
  await MovieModel.findByIdAndUpdate(showtime.movieID, {
    $pull: { showtimes: id },
  });
  await TheaterModel.findByIdAndUpdate(showtime.theaterID, {
    $pull: { showtimes: id },
  });
  await showtime.deleteOne();
  res.status(200).json({ message: "Showtime deleted successfully" });
}
