var express = require('express');
var router = express.Router();

/* GET Clients Index page. */
router.get('/', function(req, res, next) {
  res.render('clients/index');
});

module.exports = router;