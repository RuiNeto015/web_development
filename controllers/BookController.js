var Book = require("../models/BookModel");

const getAllBooks = function(req, res){
    Book.find().exec(function(err, result){
        if(err) res.status(400);
        res.render('books/index', {
            books: result,
            title: "Livros"
        });
    });
}

const addBook = function(req, res){
    var book = Book(req.body);

    book.save((err) => {
        if(err){res.status(400)}
        console.log("Successfully created an client.");
        res.redirect('/books');
    })
}

module.exports = {
    getAllBooks,
    addBook
}