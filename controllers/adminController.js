const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");
const Car = require("../models/Car");
const Booking = require("../models/Booking");
const Review = require("../models/Review");

exports.loginPage = (req, res) => {
    res.render("admin/login");
};

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const admin = await Admin.findOne({ email });

        if (!admin)
            return res.send("Invalid Email or Password");

        const match = await bcrypt.compare(password, admin.password);

        if (!match)
            return res.send("Invalid Email or Password");

        req.session.admin = admin._id;

        res.redirect("/admin/dashboard");

    } catch (err) {

        console.log(err);

        res.send("Server Error");

    }

};

exports.dashboard = async (req, res) => {

    try {

        const totalCars = await Car.countDocuments();

        const totalBookings = await Booking.countDocuments();

        const totalReviews = await Review.countDocuments();

        const totalCustomers = await Booking.distinct("email");

        res.render("admin/dashboard", {

            totalCars,

            totalBookings,

            totalReviews,

            totalCustomers: totalCustomers.length

        });

    } catch (err) {

        console.log(err);

        res.send("Dashboard Error");

    }

};