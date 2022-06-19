var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'demo_sql'
});

connection.connect(function(err,connection) {
    if (err) console.error("connect failed");
});

module.exports = connection;