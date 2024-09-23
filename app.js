import express from "express";
import logger from "morgan";
import cors from "cors";
import path from "path";
import "dotenv/config";
import { connectDB } from "./db/index.js";
import router from "./routes/index.js";
import { log } from "console";

const PORT = process.env.PORT;
const clientURL = process.env.FRONTEND_URL;
const app = express();

connectDB();

app.use(
  cors({
    origin: clientURL,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", router);

// Serve static files from the React app (assumes you have a 'build' folder)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// Serve index.html for all other routes (React frontend)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,"frontend", "dist", "index.html"));
});

// Error handling for non-API routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
