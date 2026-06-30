const Car = require("../models/Car");
const Booking = require("../models/Booking");
const Review = require("../models/Review");

// ==========================
// Home Page
// ==========================
exports.home = async (req, res) => {
    try {

        const cars = await Car.find({ available: true })
            .sort({ createdAt: -1 })
            .limit(8);

        const totalCars = await Car.countDocuments();

        const availableCars = await Car.countDocuments({
            available: true
        });

        const totalBookings = await Booking.countDocuments();
        
        const reviews = await Review.find({ approved: true })
    .sort({ createdAt: -1 })
    .limit(6);

        res.render("user/index", {
    cars,
    totalCars,
    availableCars,
    totalBookings,
    reviews
});

    } catch (err) {

        console.error(err);
        res.status(500).send("Server Error");

    }
};

// ==========================
// Fleet Page
// ==========================
exports.fleet = async (req, res) => {

    try {

        const filter = {};

        if (req.query.category && req.query.category !== "") {
            filter.category = req.query.category;
        }

        if (req.query.brand && req.query.brand !== "") {
            filter.brand = req.query.brand;
        }

        if (req.query.transmission && req.query.transmission !== "") {
            filter.transmission = req.query.transmission;
        }

        if (req.query.available === "true") {
            filter.available = true;
        }

        if (req.query.minPrice || req.query.maxPrice) {

            filter.dailyRate = {};

            if (req.query.minPrice) {
                filter.dailyRate.$gte = Number(req.query.minPrice);
            }

            if (req.query.maxPrice) {
                filter.dailyRate.$lte = Number(req.query.maxPrice);
            }

        }

        const cars = await Car.find(filter).sort({ createdAt: -1 });

        res.render("user/fleet", {

            cars,

            filters: req.query

        });

    } catch (err) {

        console.error(err);

        res.status(500).send("Server Error");

    }

};

// ==========================
// Vehicle Details
// ==========================
exports.vehicleDetails = async (req, res) => {

    try {

        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).send("Vehicle not found");
        }

        const relatedCars = await Car.find({
            _id: { $ne: car._id },
            category: car.category,
            available: true
        }).limit(4);

        res.render("user/vehicle-details", {

            car,
            relatedCars

        });

    } catch (err) {

        console.error(err);

        res.status(500).send("Server Error");

    }

};

// ==========================
// Pricing
// ==========================
exports.pricing = (req, res) => {
    res.render("user/pricing");
};

// ==========================
// About
// ==========================
exports.about = (req, res) => {
    res.render("user/about");
};

// ==========================
// Contact
// ==========================
exports.contact = (req, res) => {
    res.render("user/contact");
};

// ==========================
// Pricing Page
// ==========================
exports.pricing = async (req, res) => {

    try {

        const cars = await Car.find()
            .sort({
                dailyRate: 1
            });

        res.render("user/pricing", {
            cars
        });

    } catch (err) {

        console.error(err);
        res.status(500).send("Server Error");

    }

};