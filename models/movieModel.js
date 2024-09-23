import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    director: {
      type: [String],
      required: true,
    },
    writers: {
      type: [String],
      required: true,
    },
    stars: {
      type: [String],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    trailerUrl: String,
    image: String,
    imagePublicId: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    showtimes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Showtimes",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

const MovieModel = mongoose.model("Movies", MovieSchema);

export default MovieModel;
