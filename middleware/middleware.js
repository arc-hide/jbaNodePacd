exports.checkLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};

exports.notLogin = (req, res, next) => {
  if (!req.session.user) {
    next();
  } else {
    res.redirect("/dashboard");
  }
};
