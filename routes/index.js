var atm = require("./atm");
var battery = require("./battery");
var home = require("./home");
var login = require("./login");
var user = require("./user");
var payment = require("./payment");
// var card = require("./card");

function route(app) {
  app.use("/home", home);
  app.use("/user", user);
  app.use("/payment", payment);
  app.use("/atm", atm);
  app.use("/battery", battery);
  app.use("/", login);
  // app.use("/card", card);
}

module.exports = route;
