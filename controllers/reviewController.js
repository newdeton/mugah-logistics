const Review = require("../models/Review");

// List all reviews
exports.index = async (req, res) => {

    try {

        const reviews = await Review.find().sort({ createdAt: -1 });

        res.render("admin/reviews", {
            reviews
        });

    } catch (err) {

        console.error(err);

        res.status(500).send("Server Error");

    }

};

// Approve review
exports.approve = async (req, res) => {

    try {

        await Review.findByIdAndUpdate(req.params.id, {
            approved: true
        });

        res.redirect("/admin/reviews");

    } catch (err) {

        console.error(err);

        res.status(500).send("Server Error");

    }

};

// Delete review
exports.delete = async (req, res) => {

    try {

        await Review.findByIdAndDelete(req.params.id);

        res.redirect("/admin/reviews");

    } catch (err) {

        console.error(err);

        res.status(500).send("Server Error");

    }

};

// Review Page
exports.reviewPage = (req, res) => {

    res.render("user/reviews");

};

// Save Review
exports.store = async (req, res) => {

    try {

        await Review.create({

            fullName: req.body.fullName,

            email: req.body.email,

            rating: req.body.rating,

            message: req.body.message,

            approved: false

        });

        res.render("user/review-success");

    } catch (err) {

        console.error(err);

        res.status(500).send("Unable to submit review.");

    }

};