const express = require("express");
const router = express.Router();

const { checkLogin, notLogin } = require("../middleware/middleware");

const {
  userLogin,
  addUser,
} = require("../controller/userLogin");

const {
  priorityToDownload,
} = require("../controller/totalPriority");

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

// =====================================================
// USER LOGIN / REGISTRATION
// =====================================================

router.post("/loginUser", userLogin);

router.post("/userAdmin", addUser);

// =====================================================
// SEARCH
// =====================================================

router.get("/search/:key", checkLogin, searchPriority);

// =====================================================
// PRIORITY
// =====================================================

router.post("/addPriority", checkLogin, addPriority);

router.delete(
  "/deletePriority/:id",
  checkLogin,
  deletePriority
);

router.get(
  "/deleteAllPriority",
  checkLogin,
  deleteAllPriority
);

// =====================================================
// ADMINISTRATOR
// =====================================================

router.post("/addAdmin", addAdmin);

router.post("/adminLogin", AdministratorLogin);

router.get("/psaAdminLogin", (req, res) => {
  res.render("pages/adminLogin", {
    title: "admin",
  });
});

// =====================================================
// REPORT
// =====================================================

router.get(
  "/report",
  checkLogin,
  priorityToDownload
);

// =====================================================
// DASHBOARD
// =====================================================

router.get(
  "/dashboard",
  checkLogin,
  getPriorities
);

// =====================================================
// HOME PAGE
// =====================================================

router.get("/", notLogin, (req, res) => {
  res.render("index", {
    title: "psaDipolog",
    fields: null,
  });
});

// =====================================================
// LOGOUT
// =====================================================

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Unable to logout");
    }

    res.clearCookie("archide.io");

    return res.redirect("/");
  });
});

module.exports = router;