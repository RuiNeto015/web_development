var express = require('express');
var router = express.Router();
const {getAllEmployees, getCreateView, addEmployee, getDetailsView, deleteEmployee, getEmployeeEditPage, updateEmployee} = require("../controllers/EmployeeController");

//EMPLOYEES INDEX

/* GET Employees Index page. */
router.get('/employees', getAllEmployees);

//EMPLOYEES CREATE

/* GET Employees Create page. */
router.get('/employees/create', getCreateView);
  
router.post('/employees/create', addEmployee);

router.get('/employees/details/:id', getDetailsView);

//EMPLOYEES EDIT

router.get('/employees/edit/:id', getEmployeeEditPage);

router.post('/employees/edit/:id', updateEmployee);

//Employees DELETE

router.get('/employees/delete/:id', deleteEmployee);

module.exports = {
    routes: router
}
    


