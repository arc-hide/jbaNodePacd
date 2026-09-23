const express = require("express");
const dbConnect = require("./config/dbConfig");
const expressLayout = require("express-ejs-layouts");
require("dotenv").config();
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
dbConnect();

// ===============================
// Static files
// ===============================
app.use(flash());

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/img", express.static(__dirname + "/public/img"));
app.use("/vendors", express.static(__dirname + "/public/vendors"));

// ===============================
// Template engine
// ===============================
app.use(expressLayout);

app.set("layout", "layout");
app.set("view engine", "ejs");

// ===============================
// Session
// ===============================
app.use(
  session({
    secret: process.env.SESSION_SECRET || "development-secret",
    resave: false,
    saveUninitialized: false,
    name: "archide.io",
  })
);

// ===============================
// Flash/session messages
// ===============================
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

// ===============================
// Body parsing
// ===============================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// ===============================
// Routes
// ===============================
const user = require("./routes/userRoutes");

app.use("/", user);

// ===============================
// Local development
// ===============================
if (require.main === module) {
  app.listen(port, () => {
    console.info(`app listening on ${port}`);
  });
}

// ===============================
// Vercel
// ===============================
module.exports = app;