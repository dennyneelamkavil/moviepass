import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RequestModel = mongoose.model("Requests", RequestSchema);

export default RequestModel;

