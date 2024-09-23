import { Router } from "express";
import bookingsRouter from "./bookings/index.js";
import moviesRouter from "./movies/index.js";
import showtimesRouter from "./showtimes/index.js";
import theatersRouter from "./theaters/index.js";
import usersRouter from "./users/index.js";

const router = Router();

router.use("/bookings", bookingsRouter);
router.use("/movies", moviesRouter);
router.use("/showtimes", showtimesRouter);
router.use("/theaters", theatersRouter);
router.use("/users", usersRouter);

export default router;
