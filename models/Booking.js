const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },

    pickupLocation: {
        type: String,
        required: true
    },

    pickupDate: {
        type: Date,
        required: true
    },

    returnDate: {
        type: Date,
        required: true
    },

    driverRequired: {
        type: Boolean,
        default: false
    },

    specialRequest: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected", "Completed"],
        default: "Pending"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);