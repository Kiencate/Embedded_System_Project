var express = require("express");
var app = express();

app.get("/", function (req, res, next) {
  if (req.session.loggedin) {
    req.getConnection(function (error, conn) {
      conn.query(
        "SELECT * FROM payment ORDER BY Id DESC",
        function (err, rows, fields) {
          //if(err) throw err
          if (err) {
            req.flash("error", err);
            res.render("payment/list", {
              title: "",
              data: "",
            });
          } else {
            // render to views/payment/list.ejs template file
            res.render("payment/list", {
              title: "",
              data: rows,
            });
          }
        }
      );
    });
  } else {
    req.flash("error", "Please login first!");
    res.redirect("/login");
  }
});

module.exports = app;
