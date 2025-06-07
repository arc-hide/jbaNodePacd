const assyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { notLogin } = require("../middleware/middleware");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");
const userLogin = assyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //@credentials check
  if (!email || !password) {
    res.render("index", {
      title: "homepage",
      fields: "fields should not be empty",
    });
  } else {
    console.log("successfully grab");
  }

  const user = await User.findOne({ email });

  //@save the session user

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = {
      Name: user.fullname,
    };
    const username = req.session.user;
    const name = username.Name;
    console.log(name);

    res.redirect("/dashboard");
  } else {
    res.render("index", notLogin, {
      title: "login",
      fields: "wrong credentials or your out of order!",
    });
  }
});

const addUser = assyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  //@ts-check if user is already exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(401);
    throw new Error("user already exist");
    res.render("index", { alert: "user already exist you can now login" });
  }
  //@hashing password
  const passwordHash = await bcrypt.hash(password, 10);
  const userCreate = await User.create({
    fullname,
    email,
    password: passwordHash,
  });
  ``;
  if (userCreate) {
    res.status(200).json({ _id: userCreate.id, email: userCreate.email });
  }
});

module.exports = { userLogin, addUser };
