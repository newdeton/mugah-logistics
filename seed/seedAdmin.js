require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");
const Admin = require("../models/Admin");

const seedAdmin = async () => {

    await connectDB();

    const exists = await Admin.findOne({
        email: "admin@mugahlogistics.com"
    });

    if(exists){
        console.log("Admin already exists.");
        process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123",10);

    await Admin.create({

        name:"System Administrator",

        email:"admin@mugahlogistics.com",

        password:hashedPassword

    });

    console.log("✅ Admin created successfully.");

    process.exit();

};

seedAdmin();