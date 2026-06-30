const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");

// GET all reviews (admin page)
router.get("/", reviewController.index);

// Approve review
router.post("/approve/:id", reviewController.approve);

// Delete review
router.post("/delete/:id", reviewController.delete);

module.exports = router;