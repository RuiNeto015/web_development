var express = require('express');
var router = express.Router();

//HOME

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

module.exports = router;
