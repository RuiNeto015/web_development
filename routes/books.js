var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const {getAllBooks,addBook, deleteBook, getBookEditPage, updateBook} = require("../controllers/BookController");

//BOOKS INDEX

/* GET Books Index page. */
router.get('/books', getAllBooks);

//BOOKS CREATE

/* GET Books Create page. */
router.get('/books/create', function(req, res, next) {
  res.render('books/create', {title: "Livros"});
});

router.post('/books/create', addBook);

//BOOKS DELETE

router.delete('/books/delete/:id', deleteBook);

//BOOKS EDIT

router.get('/books/edit/:id', getBookEditPage);

router.post('/books/edit/:id', updateBook);

module.exports = {
  routes: router
}