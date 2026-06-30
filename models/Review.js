const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    message: {
        type: String,
        required: true
    },

    approved: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);