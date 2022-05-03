var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const {getAllBooks, getDetailsView, getCreateView, addBook, deleteBook, getBookEditPage, updateBook} = require("../controllers/BookController");

//BOOKS INDEX

/* GET Books Index page. */
router.get('/books', getAllBooks);

//BOOKS CREATE

/* GET Books Create page. */
router.get('/books/create', getCreateView);

router.post('/books/create', addBook);

router.get('/books/details/:id', getDetailsView);

//BOOKS EDIT

router.get('/books/edit/:id', getBookEditPage);

router.post('/books/edit/:id', updateBook);


//BOOKS DELETE

router.get('/books/delete/:id', deleteBook);


module.exports = {
  routes: router
}