import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { checkAuth } from "../../utils/authMiddleware.js";
import { verifyToken } from "../../utils/jwtToken.js";
import {
  addNewMovie,
  deleteMovie,
  getAllMovies,
  getLatestMovies,
  getMovieById,
  getTrendingMovies,
  updateMovie,
} from "../../controllers/moviesController.js";
import upload from "../../utils/multer.js";

const moviesRouter = Router();

moviesRouter.post("/addnew", verifyToken, checkAuth("theaterOwner"),upload.single("poster"), asyncHandler(addNewMovie));
moviesRouter.get("/all", asyncHandler(getAllMovies));
moviesRouter.get("/getlatestmovies/:year", asyncHandler(getLatestMovies));
moviesRouter.get("/trending", asyncHandler(getTrendingMovies));
moviesRouter.get("/:id", asyncHandler(getMovieById));
moviesRouter.put("/:id", verifyToken, checkAuth("theaterOwner"),upload.single("poster"), asyncHandler(updateMovie));
moviesRouter.delete("/:id", verifyToken, checkAuth("theaterOwner"), asyncHandler(deleteMovie));

export default moviesRouter;
