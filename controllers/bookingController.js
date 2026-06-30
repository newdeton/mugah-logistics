const Booking = require("../models/Booking");
const Car = require("../models/Car");

// ==========================
// Booking Page
// ==========================
exports.bookingPage = async (req, res) => {

    try {

        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).send("Vehicle not found.");
        }

        if (!car.available) {
            return res.send("Sorry, this vehicle is currently unavailable.");
        }

        res.render("user/booking", {
            car
        });

    } catch (err) {

        console.error(err);
        res.status(500).send("Server Error");

    }

};

// ==========================
// Save Booking
// ==========================
exports.store = async (req, res) => {

    try {

        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).send("Vehicle not found.");
        }

        const days = Math.max(
            1,
            Math.ceil(
                (new Date(req.body.returnDate) -
                new Date(req.body.pickupDate))
                / (1000 * 60 * 60 * 24)
            )
        );

        const totalAmount = days * car.dailyRate;

        await Booking.create({

            car: car._id,

            fullName: req.body.fullName,

            phone: req.body.phone,

            email: req.body.email,

            pickupLocation: req.body.pickupLocation,

            pickupDate: req.body.pickupDate,

            returnDate: req.body.returnDate,

            notes: req.body.notes,

            totalAmount

        });

        res.render("user/booking-success", {

            car,
            totalAmount

        });

    } catch (err) {

        console.error(err);
        res.status(500).send("Booking failed.");

    }

};

// ==========================
// ADMIN BOOKINGS
// ==========================
exports.adminBookings = async (req, res) => {

    try {

        const bookings = await Booking.find()
            .populate("car")
            .sort({ createdAt: -1 });

        res.render("admin/bookings", {
            bookings
        });

    } catch (err) {

        console.error(err);
        res.status(500).send("Server Error");

    }

};

// ==========================
// APPROVE BOOKING
// ==========================
exports.approveBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        booking.status = "Approved";

        await booking.save();

        await Car.findByIdAndUpdate(
            booking.car,
            {
                available: false
            }
        );

        res.redirect("/admin/bookings");

    } catch (err) {

        console.error(err);
        res.status(500).send("Server Error");

    }

};

// ==========================
// REJECT BOOKING
// ==========================
exports.rejectBooking = async (req, res) => {

    try {

        await Booking.findByIdAndUpdate(
            req.params.id,
            {
                status: "Rejected"
            }
        );

        res.redirect("/admin/bookings");

    } catch (err) {

        console.error(err);
        res.status(500).send("Server Error");

    }

};

// ==========================
// COMPLETE BOOKING
// ==========================
exports.completeBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        booking.status = "Completed";

        await booking.save();

        await Car.findByIdAndUpdate(
            booking.car,
            {
                available: true
            }
        );

        res.redirect("/admin/bookings");

    } catch (err) {

        console.error(err);
        res.status(500).send("Server Error");

    }

};