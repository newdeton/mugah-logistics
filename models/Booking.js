const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true
    },

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

    notes: String,

    totalAmount: Number,

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