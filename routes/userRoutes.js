const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { checkLogin, notLogin } = require("../middleware/middleware");
const { userLogin, addUser } = require("../controller/userLogin");
const { priorityToDownload } = require("../controller/totalPriority");
const {
  addPriority,
  searchPriority,
  getPriorities,
  deletePriority,
  deleteAllPriority,
} = require("../controller/addPriority");
const {
  AdministratorLogin,
  addAdmin,
} = require("../controller/adiministrator");

//@user admin
router.post("/loginUser", userLogin);
router.post("/userAdmin", addUser);
router.get("/search/:key", searchPriority);
router.get("/deleteAllPriority", deleteAllPriority);

//@admmin login
//@administrator post
router.post("/addAdmin", addAdmin);
router.post("/adminLogin", AdministratorLogin);
router.delete("/deletePriority/:id", deletePriority);

router.get("/psaAdminLogin", (req, res) => {
  res.render("pages/adminLogin", { title: "admin" });
});
//@report
router.get("/report", checkLogin, priorityToDownload);
//searh priorities

//@dashhboard
router.get("/dashboard", checkLogin, getPriorities);
//@priority
router.post("/addPriority", addPriority);
//@homepage
router.get("/", notLogin, (req, res) => {
  res.render("index", { title: "homepage", fields: null });
});
//administrator

router.get("/logout", (req, res) => {
  req.session.destroy();
  ``;
  res.clearCookie("archide.io");
  res.redirect("/");
});
module.exports = router;
