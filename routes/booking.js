const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");

// Booking page for a specific vehicle
router.get("/:id", bookingController.bookingPage);

// Save booking
router.post("/:id", bookingController.store);

module.exports = router;