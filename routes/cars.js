const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../config/multer");

const carController = require("../controllers/carController");

// List all vehicles
router.get("/", auth, carController.index);

// Show Add Vehicle form
router.get("/add", auth, carController.addPage);

// Save new vehicle
// Save new vehicle
router.post(
    "/add",
    auth,
    upload.array("images", 6),
    carController.store
);

router.post("/delete/:id", auth, carController.deleteCar);

module.exports = router;