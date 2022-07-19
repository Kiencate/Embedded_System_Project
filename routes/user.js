var express = require("express");
var app = express();

// SHOW LIST OF USER
app.get("/", function (req, res, next) {
  if (req.session.loggedin) {
    req.getConnection(function (error, conn) {
      conn.query(
        "SELECT * FROM user ORDER BY Id ASC",
        function (err, rows, fields) {
          //if(err) throw err
          if (err) {
            req.flash("error", err);
            res.render("user/list", {
              title: "",
              data: "",
            });
          } else {
            // render to views/user/list.ejs template file
            res.render("user/list", {
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

// SHOW ADD USER FORM
app.get("/add", function (req, res, next) {
  if (req.session.loggedin) {
    res.render("user/add", {
      title: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      cardId: "",
      balance: "",
    });
  } else {
    req.flash("error", "Please login first!");
    res.redirect("/login");
  }
  // render to views/user/add.ejs
});

// ADD NEW USER POST ACTION
app.post("/add", function (req, res, next) {
  req.assert("firstName", "First Name is required").notEmpty(); //Validate
  req.assert("lastName", "Last Name is required").notEmpty();
  req.assert("phone", "Phone is required").notEmpty();
  req.assert("email", "A valid email is required").isEmail();
  req.assert("cardId", "Card ID is required").notEmpty();
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
    var user = {
      firstName: req.sanitize("firstName").escape().trim(),
      lastName: req.sanitize("lastName").escape().trim(),
      phone: req.sanitize("phone").escape().trim(),
      email: req.sanitize("email").escape().trim(),
      cardId: req.sanitize("cardId").escape().trim(),
      balance: req.sanitize("balance").escape().trim(),
    };

    req.getConnection(function (error, conn) {
      conn.query("INSERT INTO user SET ?", user, function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);

          // render to views/user/add.ejs
          res.render("user/add", {
            title: "",
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            cardId: user.cardId,
            balance: user.balance,
          });
        } else {
          req.flash("success", "User added successfully!");
          // render to views/user/add.ejs
          res.render("user/add", {
            title: "",
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            cardId: "",
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
    res.render("user/add", {
      title: "",
      firstName: req.body.fistName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      cardId: req.body.cardId,
      balance: req.body.balance,
    });
  }
});

// SHOW EDIT USER FORM
app.get("/edit/(:Id)", function (req, res, next) {
  if (req.session.loggedin) {
    req.getConnection(function (error, conn) {
      conn.query(
        "SELECT * FROM user WHERE Id = ?",
        [req.params.Id],
        function (err, rows, fields) {
          if (err) throw err;

          // if user not found
          if (rows.length <= 0) {
            req.flash("error", "User not found with id = " + req.params.Id);
            res.redirect("/user");
          } else {
            // if user found
            // render to views/user/edit.ejs template file
            res.render("user/edit", {
              title: "",
              //data: rows[0],
              Id: rows[0].Id,
              firstName: rows[0].firstName,
              lastName: rows[0].lastName,
              phone: rows[0].phone,
              email: rows[0].email,
              cardId: rows[0].cardId,
              balance: rows[0].balance,
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

// EDIT USER POST ACTION
app.put("/edit/(:Id)", function (req, res, next) {
  req.assert("firstName", "First Name is required").notEmpty();
  req.assert("lastName", "Last Name is required").notEmpty();
  req.assert("phone", "Phone is required").notEmpty();
  req.assert("email", "A valid email is required").isEmail();
  req.assert("cardId", "Card ID is required").notEmpty();
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
    var user = {
      firstName: req.sanitize("firstName").escape().trim(),
      lastName: req.sanitize("lastName").escape().trim(),
      phone: req.sanitize("phone").escape().trim(),
      email: req.sanitize("email").escape().trim(),
      cardId: req.sanitize("cardId").escape().trim(),
      balance: req.sanitize("balance").escape().trim(),
    };

    req.getConnection(function (error, conn) {
      conn.query(
        "UPDATE user SET ? WHERE Id = " + req.params.Id,
        user,
        function (err, result) {
          //if(err) throw err
          if (err) {
            req.flash("error", err);

            // render to views/user/add.ejs
            res.render("user/edit", {
              title: "",
              Id: req.params.Id,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              phone: req.body.phone,
              email: req.body.email,
              cardId: req.body.cardId,
              balance: req.body.balance,
            });
          } else {
            req.flash("success", "Data updated successfully!");

            // render to views/user/edit.ejs
            res.render("user/edit", {
              title: "",
              Id: req.params.Id,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              phone: req.body.phone,
              email: req.body.email,
              cardId: req.body.cardId,
              balance: req.body.balance,
            });
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

    /**
     * Using req.body.name
     * because req.param('name') is deprecated
     */
    res.render("user/edit", {
      title: "",
      Id: req.params.Id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      cardId: req.body.cardId,
      balance: req.body.balance,
    });
  }
});

// DELETE USER
app.delete("/delete/(:Id)", function (req, res, next) {
  req.getConnection(function (error, conn) {
    conn.query(
      "DELETE FROM user WHERE Id = " + req.params.Id,
      function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);
          // redirect to user list page
          res.redirect("/user");
        } else {
          req.flash(
            "success",
            "User deleted successfully! id = " + req.params.Id
          );
          // redirect to user list page
          res.redirect("/user");
        }
      }
    );
  });
});

module.exports = app;
