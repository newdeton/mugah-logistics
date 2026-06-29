const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },

    brand:{
        type:String,
        required:true,
        trim:true
    },

    category:{
        type:String,
        enum:["Sedan","SUV","Van","Pickup","Luxury","Bus"],
        required:true
    },

    year:Number,

    color:String,

    registrationNumber:{
        type:String,
        unique:true,
        required:true
    },

    seats:Number,

    transmission:{
        type:String,
        enum:["Automatic","Manual"],
        default:"Automatic"
    },

    fuelType:{
        type:String,
        enum:["Petrol","Diesel","Hybrid","Electric"],
        default:"Petrol"
    },

    dailyRate:{
        type:Number,
        required:true
    },

    weeklyRate:Number,

    monthlyRate:Number,

    mileage:String,

    description:String,

    features:[String],

    images:[String],

    available:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Car",carSchema);