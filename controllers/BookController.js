var Book = require("../models/BookModel");

const getAllBooks = function(req, res){
    Book.find().exec(function(err, result){
        if(err){res.status(400)}
        res.render('books/index', {
            books: result,
            title: "Livros"
        });
    });
}

const getDetailsView = function(req, res){
    Book.findById(req.params.id).exec(function(err, result){
        if(err){res.status(400)}
        res.render('books/details', {
            book: result,
            title: "Livros"
        });
    });
}

const getCreateView = function(req, res, next) {
    res.render('books/create', {title: "Livros"});
}

const addBook = function(req, res){
    var book = Book(req.body);
    book.save((err) => {
        if(err){res.status(400)}
        console.log("Successfully created a book.");
        res.redirect('/books');
    })
}

const getBookEditPage = function(req, res){
    Book.findOne({_id: req.params.id}).exec(function(err, book){
        if(err){res.status(400)}
        res.render('books/edit', {
            book: book,
            title: "Livros"
        })
    });
}

const updateBook = function(req, res){
    Book.findByIdAndUpdate(req.params.id, req.body, {runValidators:true},  function(err, book){
        if(err){
            console.log(err);
        }
        res.redirect("/books")
    });
}

const deleteBook = function(req, res){
    Book.remove({_id: req.params.id}, function(err){
        if(err){res.status(400)}
        console.log("Successfully deleted a book.");
        res.redirect('/books');
    })
}

module.exports = {
    getAllBooks,
    getDetailsView,
    getCreateView,
    addBook,
    deleteBook,
    getBookEditPage,
    updateBook
}