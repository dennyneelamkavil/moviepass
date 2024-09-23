import mongoose from "mongoose";

const ShowtimeSchema = new mongoose.Schema(
  {
    movieID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies",
      required: true,
    },
    theaterID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theaters",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

ShowtimeSchema.index(
  { movieID: 1, theaterID: 1, date: 1, time: 1 },
  { unique: true }
);

const ShowtimeModel = mongoose.model("Showtimes", ShowtimeSchema);

export default ShowtimeModel;
