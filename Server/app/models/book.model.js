const db = require('../common/connect');
const Book = function (book) {
    this.id = book.id;
    this.name = book.name;
}
Book.get_all = function (result) {
    db.query("SELECT * FROM book", function (err, book) {
        if (err) result(null);
        else result(book);
    });
}

Book.get_by_id = function (id, result) {
    db.query("SELECT * FROM book WHERE id = ?", id, function (err, book) {
        if (err) result(null);
        else if (book.length > 0) result(book[0]);
        else result(null);
    });

}

Book.create = function (data, result) {
    db.query("INSERT INTO book SET ?", data, function (err, book) {
        if (err) result(null);
        else result({ id: book.insertId, ...data });
    })

}

Book.update = function (data, result) {
    console.log(data);
    db.query("UPDATE book SET name=? WHERE id=?", [data.name, data.id], function (err, book) {
        if (err) result(null);
        else result({ id: book.insertId, ...data });
    })
}
Book.remove = function (data, result) {
    db.query("DELETE FROM book WHERE id=?", data.id, function (err, book) {
        if (err) result(null);
        else result( "Delete id " + String(data.id) +" successfully!" );
    })
}
module.exports = Book;