var express = require("express");
var app = express();
var session = require("express-session")

// Show Login form
app.get("/", function (req, res, next) {
  // render to views/user/add.ejs
  res.render("login/login", {
    title: "",
    admin: "",
    password: "",
  });
});

app.get("/login", function (req, res, next) {
  // render to views/user/add.ejs
  res.render("login/login", {
    title: "",
    admin: "",
    password: "",
  });
});

// Authenticate admin
app.post("/auth", function (req, res, next) {
  req.assert("admin", "Admin is required").notEmpty();
  req.assert("password", "Password is required").notEmpty();

  var errors = req.validationErrors();

  if (!errors) {
    var admin = req.body.admin;
    var password = req.body.password;

    req.getConnection(function (error, conn) {
      conn.query(
        "SELECT * FROM account WHERE admin = ? AND password = ?",
        [admin, password],
        function (err, rows, fields) {
          if (err) throw err;

          // if admin not found
          if (rows.length <= 0) {
            req.flash("error", "Please correct enter Admin and Password!");
            res.redirect("/login");
          } else {
            // if admin found
            // render to views/home.js template file
            req.session.loggedin = true;
            req.session.admin = admin;
            res.redirect("/home");
          }
        }
      );
    });
  } else {
    //Display errors to user
    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);
    res.render("login/login/", {
      title: "",
      admin: req.body.admin,
      password: req.body.password,
    });
  }
});

// Show Logout
app.get("/logout", function (req, res) {
  req.session.destroy(null);
  req.flash("success", "Login Again Here");
  res.redirect("/login");
});

module.exports = app;
