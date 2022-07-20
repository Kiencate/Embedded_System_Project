var express = require("express");
var app = express();

app.get("/", function (req, res, next) {
  // render to views/index.ejs template file
  res.render("home", { title: "" });
});

module.exports = app;
