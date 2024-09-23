import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { checkAuth } from "../../utils/authMiddleware.js";
import { verifyToken } from "../../utils/jwtToken.js";
import {
  addNewBooking,
  checkStatus,
  deleteBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUserID,
  paymentSession,
  updateBooking,
} from "../../controllers/bookingsController.js";

const bookingsRouter = Router();

bookingsRouter.post("/payment/create-checkout-session", verifyToken, asyncHandler(paymentSession));
bookingsRouter.get("/payment/status/:id", verifyToken, asyncHandler(checkStatus));
bookingsRouter.post("/addnew", verifyToken, asyncHandler(addNewBooking));
bookingsRouter.get("/all", verifyToken, asyncHandler(getAllBookings));
bookingsRouter.get("/user/:id", verifyToken, asyncHandler(getBookingsByUserID));
bookingsRouter.get("/:id", verifyToken, asyncHandler(getBookingById));
bookingsRouter.put("/:id", verifyToken, asyncHandler(updateBooking));
bookingsRouter.delete("/:id", verifyToken, asyncHandler(deleteBooking));

export default bookingsRouter;
