var express = require('express');
var router = express.Router();

/* GET Employees Create page. */
router.get('/', function(req, res, next) {
    res.render('employees/create', {title:"Funcionários"});
});
  
module.exports = router;

