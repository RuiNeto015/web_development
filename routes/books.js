var express = require('express');
var router = express.Router();
const {addBook} = require("../controllers/BookController");

//BOOKS INDEX

/* GET Books Index page. */
router.get('/books', function(req, res, next) {
  res.render('books/index', {title: "Livros"});
});

//BOOKS CREATE

/* GET Books Create page. */
router.get('/books/create', function(req, res, next) {
  res.render('books/create', {title: "Livros"});
});

router.post('/books/create', addBook);

module.exports = {
  routes: router
}