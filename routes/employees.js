var express = require('express');
var router = express.Router();
const {addEmployee} = require("../controllers/EmployeeController");

//EMPLOYEES INDEX

/* GET Employees Index page. */
router.get('/employees', function(req, res, next) {
    res.render('employees/index', {title:"Funcionários"});
});

//EMPLOYEES CREATE

/* GET Employees Create page. */
router.get('/employees/create', function(req, res, next) {
    res.render('employees/create', {title:"Funcionários"});
});
  
router.post('/employees/create', addEmployee);

module.exports = {
    routes: router
}
    


