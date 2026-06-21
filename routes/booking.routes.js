const express = require("express");

const {
  bookCar,
  getMyBookings,
  cancelBooking,
} = require("../controllers/booking.controller");

const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/bookings", verifyToken, bookCar);

router.get("/my-bookings", verifyToken, getMyBookings);

router.delete("/bookings/:id", verifyToken, cancelBooking);

module.exports = router;
