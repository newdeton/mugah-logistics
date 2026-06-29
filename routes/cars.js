const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const carController = require("../controllers/carController");

router.get("/", auth, carController.index);

router.get("/add", auth, carController.addPage);

module.exports = router;