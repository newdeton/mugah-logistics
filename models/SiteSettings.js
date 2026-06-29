const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema({

    companyName: String,

    heroTitle: String,

    heroSubtitle: String,

    phone: String,

    email: String,

    address: String,

    facebook: String,

    instagram: String,

    twitter: String

});

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);