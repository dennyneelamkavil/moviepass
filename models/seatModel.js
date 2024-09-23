import mongoose from "mongoose";

const SeatSchema = new mongoose.Schema(
  {
    theaterID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theaters",
      required: true,
    },
    seatID: {
      type: String,
      required: true,
    },
    seatType: {
      type: String,
      enum: ["standard", "premium"],
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

SeatSchema.index({ theaterID: 1, seatID: 1 }, { unique: true });

const SeatModel = mongoose.model("Seats", SeatSchema);

export default SeatModel;
