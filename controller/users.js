var express = require("express");
var app = express();

//show json users list
app.get("/", function (req, res) {
  req.getConnection(function (error, conn) {
    conn.query(
      "SELECT * FROM user ORDER BY Id ASC",
      function (error, results, fields) {
        if (error) throw error;
        return res.status(400).send({
          message: "Users List",
          data: results,
        });
      }
    );
  });
});

//show json user by cardId
app.get("/:cardId", function (req, res) {
  req.getConnection(function (error, conn) {
    if (!req.params.cardId) {
      return res.status(400).send({ error: true, message: "Please Provide Card Id" });
    }
    conn.query(
      "SELECT * FROM user WHERE cardId=?",
      req.params.cardId,
      function (error, results, fields) {
        if (error) throw error;
        return res.send({
          message: "user",
          data: results[0],
        });
      }
    );
  });
});

app.put("/update/:cardId", function (req, res) {
  let cardId = req.params.cardId;
  if (!cardId) {
    return res
      .status(400)
      .send({ error: cardId, message: "Please provide Card Id for update" });
  }
  conn.query(
    "UPDATE user.balance SET user = ? WHERE id = ?",
    cardId,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        data: results,
        message: "user has been updated balance successfully.",
      });
    }
  );
});

module.exports = app;
