const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    name: String,

    rating: {
        type: Number,
        min: 1,
        max: 5
    },

    message: String,

    approved: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);