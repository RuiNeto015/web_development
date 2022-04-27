var Book = require("../models/BookModel");

const addBook = function(req, res){
    var book = Book(req.body);

    book.save((err) => {
        if(err){res.status(400)}
        console.log("Successfully created an client.");
        res.redirect('/books');
    })
}

module.exports = {
    addBook
}