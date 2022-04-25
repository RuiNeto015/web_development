const { save } = require('debug/src/browser');
var express = require('express');
var router = express.Router();
const EmployeeController = require("../../controllers/EmployeeController");

/* GET Employees Create page. */
router.get('/', function(req, res, next) {
    res.render('employees/create', {title:"Registar Funcionário"});
});
  
router.post('/', save);

module.exports = router;

