var express = require('express');
var router = express.Router();

/* GET Books Index page. */
router.get('/', function(req, res, next) {
  res.render('books/index', { title: 'Livros' });
});

module.exports = router;