import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    sessionID: {
      type: String,
      required: true,
    },
    showtimeID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Showtimes",
      required: true,
    },
    seatID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seats",
        required: true,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const BookingModel = mongoose.model("Bookings", BookingSchema);

export default BookingModel;
