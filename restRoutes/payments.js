var express = require("express");
var app = express();

//add new payment
app.post("/add", function (req, res) {
  var payment = {
    userId: req.body.userId,
    atmId: req.body.atmId,
    batteryId: req.body.batteryId,
    capacity: req.body.capacity,
    totalPrice: req.body.totalPrice,
    time: req.body.time,
  };
  if (!payment) {
    res.status(400).send({
      error: true,
      message: "Cann't add on payment.",
    });
  }
  req.getConnection(function (error, conn) {
    conn.query(
      "INSERT INTO payment SET ?",
      {
        userId: payment.userId,
        atmId: payment.atmId,
        batteryId: payment.batteryId,
        capacity: payment.capacity,
        totalPrice: payment.totalPrice,
        time: payment.time,
      },
      function (err, result) {
        if (err) throw err;
        // else {
        res.send({
          message: "Payment added successfully!",
          data: result,
        });
        // }
      }
    );
  });
});

module.exports = app;
