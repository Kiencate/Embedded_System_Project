var express = require("express");
var app = express();

//add new payment
app.post("/add", function (req, res, next) {
  if (!errors) {
    var payment = {
      Id: req.sanitize("Id").escape().trim(),
      userId: req.sanitize("userId").escape().trim(),
      atmId: req.sanitize("atmId").escape().trim(),
      batteryId: req.sanitize("batteryId").escape().trim(),
      capacity: req.sanitize("capacity").escape().trim(),
      totalPrice: req.sanitize("totalPrice").escape().trim(),
      time: req.sanitize("time").escape().trim(),
    };
    var errors = req.validationErrors();

    req.getConnection(function (error, conn) {
      conn.query("INSERT INTO payment SET ?", payment, function (err, result) {
        //if(err) throw err
        if (err) {
          res.status(400).send({
            message: "Cann't added on payment.",
          });
        } else {
          res.send({
            message: "Payment added successfully!",
            data: result,
          });
        }
      });
    });
  } else {
    res.status(400).send({
      message: "error",
    });
  }
});

module.exports = app;
