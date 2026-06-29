const Car = require("../models/Car");

// List Cars
exports.index = async (req, res) => {

    try {

        const cars = await Car.find().sort({ createdAt: -1 });

        res.render("admin/cars/index", { cars });

    } catch (err) {

        console.log(err);

        res.send("Error loading vehicles.");

    }

};

// Show Add Form
exports.addPage = (req, res) => {

    res.render("admin/cars/add");

};