const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const bookingController = require("../controllers/bookingController");

// All bookings
router.get("/", auth, bookingController.adminBookings);

// Approve booking
router.post("/approve/:id", auth, bookingController.approveBooking);

// Reject booking
router.post("/reject/:id", auth, bookingController.rejectBooking);

// Complete booking
router.post("/complete/:id", auth, bookingController.completeBooking);

module.exports = router;