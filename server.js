const express = require("express");
const dbConnect = require("./config/dbConfig");
const expressLayout = require("express-ejs-layouts");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const { checkLogin, notLogin } = require("./middleware/middleware");

dbConnect();
const app = express();
const port = process.env.PORT || 3000;
//@static files
app.use(flash());
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/vendors", express.static(__dirname + "public/vendors"));

//@template engine
app.use(expressLayout);
app.set("layout", "layout");
app.set("view engine", "ejs");

//@session
app.use(
  session({
    secret: "random",
    resave: true,
    saveUninitialized: false,
    name: "archide.io",
  })
);
//@storing session message
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
//@navigation
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const user = require("./routes/userRoutes");
app.use("/", user);

app.listen(port, () => {
  console.info(`app listening on ${port}`);
});
