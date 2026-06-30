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

module.exports = router;