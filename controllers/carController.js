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

// Show Edit Form
exports.editPage = async (req, res) => {

    try {

        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.redirect("/admin/cars");
        }

        res.render("admin/cars/edit", { car });

    } catch (err) {

        console.log(err);

        res.redirect("/admin/cars");

    }

};


// Update Vehicle
exports.update = async (req, res) => {

    try {

        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.redirect("/admin/cars");
        }

        // Keep existing images
        let images = car.images;

        // If new images uploaded, replace old ones
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => file.path);
        }

        const features = req.body.features
            ? req.body.features.split(",").map(f => f.trim())
            : [];

        await Car.findByIdAndUpdate(req.params.id, {
            ...req.body,
            features,
            images
        });

        res.redirect("/admin/cars");

    } catch (err) {

        console.log(err);

        res.status(500).send("Error updating vehicle");

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