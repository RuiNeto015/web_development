var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const bookController = require("../controllers/BookController");

//BOOKS INDEX

router.get('/books', bookController.getAllBooks);

//BOOKS DETAILS

router.get('/books/details/:id', bookController.getDetailsView);

//BOOKS CREATE

router.get('/books/create', bookController.getCreateView);

router.post('/books/create', bookController.addBook);

//BOOKS EDIT

router.get('/books/edit/:id', bookController.getBookEditPage);

router.post('/books/edit/:id', bookController.updateBook);

//BOOKS DELETE

router.get('/books/delete/:id', bookController.deleteBook);

//BOOKS SEARCH BY

router.get('/books/searchByISBN/:ISBN', bookController.bookSearchByISBN);

router.get('/books/searchByISBN/:ISBN/:condition', bookController.bookSearchByISBNandCondition);

//BOOKS FILTER BY

router.get('/books/filterByTitle/:title', bookController.bookFilterByTitle);

router.get('/books/filterByAuthor/:author', bookController.bookFilterByAuthor);



router.get('/books/booksList', bookController.booksList);

router.get('/books/bookById/:id', bookController.bookById);

module.exports = {
  routes: router
}