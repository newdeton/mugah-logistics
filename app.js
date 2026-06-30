const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const methodOverride = require("method-override");

dotenv.config();

const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// =========================
// Middleware
// =========================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

// =========================
// Sessions
// =========================
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 24 hours
        }
    })
);

// =========================
// View Engine
// =========================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// =========================
// Routes
// =========================
const publicRoutes = require("./routes/public");
const adminRoutes = require("./routes/admin");
const carRoutes = require("./routes/cars");
const adminBookingRoutes = require("./routes/adminBookings");
const bookingRoutes = require("./routes/booking");



app.use("/", publicRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/cars", carRoutes);
app.use("/admin/bookings", adminBookingRoutes);
app.use("/booking", bookingRoutes);

// =========================
// Server
// =========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚗 MUGAH LOGISTICS is running on http://localhost:${PORT}`);
});