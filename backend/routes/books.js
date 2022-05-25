var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const {getAllBooks, getDetailsView, getCreateView, addBook, deleteBook, getBookEditPage, updateBook,
  bookSearchByISBN, bookSearchByISBNandCondition, bookFilterByTitle, bookFilterByAuthor, booksList
} = require("../controllers/BookController");

//BOOKS INDEX

router.get('/books', getAllBooks);

//BOOKS DETAILS

router.get('/books/details/:id', getDetailsView);

//BOOKS CREATE

router.get('/books/create', getCreateView);

router.post('/books/create', addBook);

//BOOKS EDIT

router.get('/books/edit/:id', getBookEditPage);

router.post('/books/edit/:id', updateBook);

//BOOKS DELETE

router.get('/books/delete/:id', deleteBook);

//BOOKS SEARCH BY

router.get('/books/searchByISBN/:ISBN', bookSearchByISBN);

router.get('/books/searchByISBN/:ISBN/:condition', bookSearchByISBNandCondition);

//BOOKS FILTER BY

router.get('/books/filterByTitle/:title', bookFilterByTitle);

router.get('/books/filterByAuthor/:author', bookFilterByAuthor);



router.get('/books/booksList', booksList);

module.exports = {
  routes: router
}