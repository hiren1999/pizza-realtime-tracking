require("dotenv").config();

const express = require("express");

const app = express();

const ejs = require("ejs");

const path = require("path");

const expressLayout = require("express-ejs-layouts");

const PORT = process.env.PORT || 5000;

const mongoose = require("mongoose");

const session = require("express-session");

// Database connection

const url = "mongodb://localhost/pizza";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection
    .once("open", () => {
        console.log("Database connected...");
    })
    .catch((err) => {
        console.log("connection failed...");
    });

//session config
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
    })
);

//assets
app.use(express.static("public"));

// set template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(PORT, () => {
    console.log(`APP STARTED ON ${PORT}`);
});