const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");

// ===============================
// General Booking (Any Vehicle)
// ===============================
router.get("/book-now", bookingController.generalBookingPage);
router.post("/book-now", bookingController.storeGeneralBooking);

// ===============================
// Fleet Vehicle Booking
// ===============================
router.get("/:id", bookingController.bookingPage);
router.post("/:id", bookingController.store);

module.exports = router;