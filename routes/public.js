const express = require("express");
const router = express.Router();

const publicController = require("../controllers/publicController");

// Home
router.get("/", publicController.home);

// Fleet
router.get("/fleet", publicController.fleet);

// Vehicle Details
router.get("/fleet/:id", publicController.vehicleDetails);

// About
router.get("/about", publicController.about);

// Contact
router.get("/contact", publicController.contact);

// pricing
router.get("/pricing", publicController.pricing);

const reviewController = require("../controllers/reviewController");

// Review page
router.get("/reviews", reviewController.reviewPage);

// Submit review
router.post("/reviews", reviewController.store);
module.exports = router;