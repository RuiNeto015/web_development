var Book = require("../models/BookModel");
var bookController = {}
//BOOKS INDEX

bookController.getAllBooks = function(req, res){
    Book.find().exec(function(err, result){
        if(err){res.status(400)}
        res.render('books/index', {
            books: result,
            title: "Livros"
        });
    });
}

//BOOKS DETAILS

bookController.getDetailsView = function(req, res){
    Book.findById(req.params.id).exec(function(err, result){
        if(err){res.status(400)}
        if(req.origin == "http://localhost:4200") return res.status(200).json(result);
        res.render('books/details', {
            book: result,
            title: "Livros"
        });
    });
}

//BOOKS CREATE

bookController.getCreateView = function(req, res, next) {
    res.render('books/create', {title: "Livros"});
}

bookController.addBook = function(req, res){

    var book = Book(req.body);
    var query = req.body.isbn;
    var query1 = req.body.condition;

    Book.findOne({isbn:query, condition:query1}, function(err, dup){
        if(err) console.log(err);
        if(dup){
            console.log("Este ISBN com este estado já existe na base de dados!");
            res.render('books/create', {title: "Livros", error: "Já existe um livro com este ISBN e com este estado"});
            
        }else{
            book.save((err) => {
                if(err){res.status(400)}
                console.log("Successfully created a book.");
                res.redirect('/books');
            })
        }
    })
}

//BOOKS EDIT

bookController.getBookEditPage = function(req, res){
    Book.findOne({_id: req.params.id}).exec(function(err, book){
        if(err){res.status(400)}
        res.render('books/edit', {
            book: book,
            title: "Livros"
        })
    });
}

bookController.updateBook = function(req, res){
    Book.findByIdAndUpdate(req.params.id, req.body, {runValidators:true},  function(err, book){
        if(err){
            console.log(err);
        }
        res.redirect("/books")
    });
}

//BOOKS DELETE

bookController.deleteBook = function(req, res){
    Book.remove({_id: req.params.id}, function(err){
        if(err){res.status(400)}
        console.log("Successfully deleted a book.");
        res.redirect('/books');
    })
}

//BOOKS SEARCH BY

bookController.bookSearchByISBN = function(req, res){
    Book.find({isbn: req.params.ISBN}).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}

bookController.bookSearchByISBNandCondition = function(req, res){
    Book.findOne({isbn: req.params.ISBN, condition: req.params.condition}).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}

//BOOKS FILTER BY

bookController.bookFilterByTitle = function(req, res){
    Book.find({ title: { $regex: req.params.title, $options: "i" } }).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}

bookController.bookFilterByAuthor = function(req, res){
    Book.find({ author: { $regex: req.params.author, $options: "i" } }).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}

bookController.booksList = function(req, res){
    Book.find({condition: "Novo"}).sort({ created_at: -1 }).limit(5).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}

bookController.bookById = function(req, res){
    Book.find({_id: req.params.id}).exec(function(err, result){
        if(err){res.status(400)}
        res.status(200).json(result);
    });
}

module.exports = bookController