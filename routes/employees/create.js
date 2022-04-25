var express = require('express');
var router = express.Router();
const {addEmployee} = require("../../controllers/EmployeeController");

/* GET Employees Create page. */
router.get('/', function(req, res, next) {
    res.render('employees/create', {title:"Registar Funcionário"});
});
  
router.post('/', addEmployee);

module.exports = router;

