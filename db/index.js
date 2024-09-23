import mongoose from "mongoose";

const MONGO_DB_URL = process.env.MONGO_DB_URL;
const DB_NAME = process.env.DB_NAME;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL, {
      dbName: DB_NAME,
    });
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("Error connecting to DB: ", error);
  }
};
