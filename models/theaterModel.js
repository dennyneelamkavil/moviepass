import mongoose from "mongoose";

const TheaterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    seatingLayout: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seats",
      },
    ],
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

const TheaterModel = mongoose.model("Theaters", TheaterSchema);

export default TheaterModel;

// capacity, contactinfo, amenities can be added
