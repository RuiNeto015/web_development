var express = require('express');
var router = express.Router();

/* GET Employees Index page. */
router.get('/', function(req, res, next) {
  res.render('employees/index');
});

module.exports = router;