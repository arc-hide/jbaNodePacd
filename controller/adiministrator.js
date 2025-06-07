const assynHandler = require("express-async-handler");
const adminUser = require("../models/adminModel");
const bcrypt = require("bcrypt");

const AdministratorLogin = assynHandler(async (req, res) => {
  const { email, password } = req.body;
  const adminUser = await adminUser.findOne({ email });
  if (adminUser && (await bcrypt.compare(password, adminUser.password))) {
    req.session.adminUser = {
      _id: adminUser.id,
      email: adminUser.email,
      Name: adminUser.fullname,
    };
    console.log(req.session.adminUser);
  }
});

const addAdmin = assynHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    res.status(400).json({ message: "fields should not be empty" });
  }
  const userExist = await adminUser.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("user already exist");
  }
  //hashing password
  const passwordHash = await bcrypt.hash(password, 10);
  //@store new admin in the database
  const adminCreate = await adminUser.create({
    fullname,
    email,
    password: passwordHash,
  });
  //if successfull
  if (adminCreate) {
    res.status(200).json({ _id: adminCreate.id, email: adminCreate.email });
  }
});

module.exports = { AdministratorLogin, addAdmin };
