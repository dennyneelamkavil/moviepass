import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLoggedIn: {
      type: Date,
      default: Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "theaterOwner"],
      default: "user",
    },
    city: String,
    bookingHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookings",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
