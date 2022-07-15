var express = require("express");
var app = express();

// SHOW LIST OF ATM
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query(
      "SELECT * FROM atm ORDER BY Id ASC",
      function (err, rows, fields) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);
          res.render("atm/list", {
            title: "",
            data: "",
          });
        } else {
          // render to views/atm/list.ejs template file
          res.render("atm/list", {
            title: "",
            data: rows,
          });
        }
      }
    );
  });
});

module.exports = app;