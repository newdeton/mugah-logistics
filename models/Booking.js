const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    // Optional if booking is for a listed fleet vehicle
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        default: null
    },

    // Customer Information
    fullName: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    // Vehicle Request (for vehicles not in fleet)

    requestedCategory: String,

    requestedBrand: String,

    requestedModel: String,

    requestedTransmission: String,

    requestedSeats: Number,

    // Booking Details

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

    notes: String,

    totalAmount: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Approved",
            "Rejected",
            "Completed"
        ],
        default: "Pending"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Booking", bookingSchema);