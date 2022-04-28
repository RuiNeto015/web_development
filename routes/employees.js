var express = require('express');
var router = express.Router();
const {getAllEmployees, addEmployee, getDetailsView} = require("../controllers/EmployeeController");

//EMPLOYEES INDEX

/* GET Employees Index page. */
router.get('/employees', getAllEmployees);

//EMPLOYEES CREATE

/* GET Employees Create page. */
router.get('/employees/create', function(req, res, next) {
    res.render('employees/create', {title:"Funcionários"});
});
  
router.post('/employees/create', addEmployee);

router.get('/employees/details/:id', getDetailsView);

module.exports = {
    routes: router
}
    


