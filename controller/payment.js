var express = require("express");
var app = express();

//Update balance
app.put("/edit/(:Id)", function (req, res, next) {

    var payment = {
        // : req.sanitize("firstName").escape().trim(),
        // : req.sanitize("lastName").escape().trim(),
        // : req.sanitize("phone").escape().trim(),
        // : req.sanitize("email").escape().trim(),
      };

    

    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);

});



module.exports = app;
