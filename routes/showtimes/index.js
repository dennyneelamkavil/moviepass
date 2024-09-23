import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { checkAuth } from "../../utils/authMiddleware.js";
import { verifyToken } from "../../utils/jwtToken.js";
import {
  addNewShowtime,
  deleteShowtime,
  getAllShowtimes,
  getShowtimeById,
  getShowtimeByTheater,
  updateShowtime,
} from "../../controllers/showtimesController.js";

const showtimesRouter = Router();

showtimesRouter.post("/addnew", verifyToken, checkAuth("theaterOwner"), asyncHandler(addNewShowtime));
showtimesRouter.get("/all", verifyToken, asyncHandler(getAllShowtimes));
showtimesRouter.get("/theater/:theaterID", verifyToken, asyncHandler(getShowtimeByTheater));
showtimesRouter.get("/:id", verifyToken, asyncHandler(getShowtimeById));
showtimesRouter.put("/:id", verifyToken, checkAuth("theaterOwner"), asyncHandler(updateShowtime));
showtimesRouter.delete("/:id", verifyToken, checkAuth("theaterOwner"), asyncHandler(deleteShowtime));

export default showtimesRouter;
