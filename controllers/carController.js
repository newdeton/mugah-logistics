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
exports.store = async (req, res) => {
    try {
        const images = req.files ? req.files.map(file => file.path) : [];

        const features = req.body.features
            ? req.body.features.split(",").map(f => f.trim())
            : [];

        await Car.create({
            ...req.body,
            features,
            images
        });

        return res.redirect("/admin/cars");

    } catch (err) {
        console.error(err);
        return res.status(500).send("Error saving vehicle");
    }
};

exports.deleteCar = async (req, res) => {

    try {

        await Car.findByIdAndDelete(req.params.id);

        res.redirect("/admin/cars");

    } catch (err) {

        console.log(err);

        res.status(500).send("Error deleting vehicle");
    }
};