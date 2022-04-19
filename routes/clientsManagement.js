var express = require('express');
var router = express.Router();

/* GET clients page. */
router.get('/', function(req, res, next) {
  res.render('clientsManagement');
});

module.exports = router;