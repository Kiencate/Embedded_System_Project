var express = require("express");
var app = express();

// SHOW LIST OF CARD
app.get("/", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query(
      "SELECT * FROM card ORDER BY userId ASC",
      function (err, rows, fields) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);
          res.render("card/list", {
            title: "",
            data: "",
          });
        } else {
          // render to views/card/list.ejs template file
          res.render("card/list", {
            title: "",
            data: rows,
          });
        }
      }
    );
  });
});

// SHOW EDIT CARD FORM
app.get("/edit/(:userId)", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query(
      "SELECT * FROM card WHERE userId = ?",
      [req.params.userId],
      function (err, rows, fields) {
        if (err) throw err;

        // if Card Id not found
        if (rows.length <= 0) {
          req.flash(
            "error",
            "Card ID not found with userId = " + req.params.userId
          );
          res.redirect("/card");
        } else {
          // if user found
          // render to views/card/edit.ejs template file
          res.render("card/edit", {
            title: "",
            //data: rows[0],
            Id: rows[0].Id,
            userId: rows[0].userId,
            balance: rows[0].balance,
          });
        }
      }
    );
  });
});

// EDIT CARD POST ACTION
app.put("/edit/(:Id)", function (req, res, next) {
  req.assert("Id", "ID is required").notEmpty();
  req.assert("balance", "Balance is required").notEmpty();

  var errors = req.validationErrors();

  if (!errors) {
    //No errors were found.  Passed Validation!

    /********************************************
           * Express-validator module
           
          req.body.comment = 'a <span>comment</span>';
          req.body.username = '   a user    ';
  
          req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
          req.sanitize('username').trim(); // returns 'a user'
          ********************************************/
    var card = {
      Id: req.sanitize("Id").escape().trim(),
      balance: req.sanitize("balance").escape().trim(),
    };

    req.getConnection(function (error, conn) {
      conn.query(
        "UPDATE card SET ? WHERE userId = " + req.params.userId,
        card,
        function (err, result) {
          //if(err) throw err
          if (err) {
            req.flash("error", err);

            // render to views/card/add.ejs
            res.render("card/edit", {
              title: "Edit Card",
              Id: req.body.Id,
              userId: req.params.userId,
              balance: req.body.balance,
            });
          } else {
            req.flash("success", "Data updated successfully!");

            // render to views/card/edit.ejs
            res.render("card/edit", {
              title: "Edit Card",
              Id: req.body.Id,
              userId: req.params.userId,
              balance: req.body.balance,
            });
          }
        }
      );
    });
  } else {
    //Display errors to card
    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);

    /**
     * Using req.body.name
     * because req.param('name') is deprecated
     */
    res.render("card/edit", {
      title: "Edit Card",
      Id: req.body.Id,
      userId: req.params.userId,
      balance: req.body.balance,
    });
  }
});

// SHOW ADD CARD FORM
app.get("/add", function (req, res, next) {
  // render to views/card/add.ejs
  res.render("card/add", {
    Id: "",
    userId: "",
    balance: "",
  });
});

// ADD NEW CARD POST ACTION
app.post("/add", function (req, res, next) {
  req.assert("Id", "Card ID is required").notEmpty();
  req.assert("userID", "User ID is required").notEmpty();
  req.assert("balance", "Balance is required").notEmpty();
  var errors = req.validationErrors();

  if (!errors) {
    //No errors were found.  Passed Validation!

    /********************************************
           * Express-validator module
           
          req.body.comment = 'a <span>comment</span>';
          req.body.username = '   a user    ';
  
          req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
          req.sanitize('username').trim(); // returns 'a user'
          ********************************************/
    var card = {
      Id: req.sanitize("Id").escape().trim(),
      userId: req.sanitize("userId").escape().trim(),
      balance: req.sanitize("balance").escape().trim(),
    };

    req.getConnection(function (error, conn) {
      conn.query("INSERT INTO card SET ?", card, function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);

          // render to views/card/add.ejs
          res.render("card/add", {
            title: "",
            Id: card.Id,
            userId: card.userId,
            balance: card.balance,
          });
        } else {
          req.flash("success", "Card added successfully!");

          // render to views/card/add.ejs
          res.render("card/add", {
            title: "",
            Id: "",
            userId: "",
            balance: "",
          });
        }
      });
    });
  } else {
    //Display errors to user
    var error_msg = "";
    errors.forEach(function (error) {
      error_msg += error.msg + "<br>";
    });
    req.flash("error", error_msg);

    /**
     * Using req.body.name
     * because req.param('name') is deprecated
     */
    res.render("card/add", {
      title: "",
      Id: req.body.Id,
      userId: req.body.userId,
      balance: req.body.balance,
    });
  }
});

// DELETE CARD
app.delete("/delete/(:userId)", function (req, res, next) {
  var card = { Id: req.params.Id };

  req.getConnection(function (error, conn) {
    conn.query(
      "DELETE FROM card WHERE userId = " + req.params.userId,
      card,
      function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);
          // redirect to user list page
          res.redirect("/card");
        } else {
          req.flash(
            "success",
            "Card deleted successfully! id = " + req.params.userId
          );
          // redirect to user list page
          res.redirect("/card");
        }
      }
    );
  });
});

module.exports = app;
