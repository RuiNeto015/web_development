var express = require('express');
var router = express.Router();
const {getAllEmployees, getCreateView, addEmployee, getDetailsView, deleteEmployee, getEmployeeEditPage, updateEmployee} = require("../controllers/EmployeeController");

//EMPLOYEES INDEX

router.get('/employees', getAllEmployees);

//EMPLOYEES DETAILS

router.get('/employees/details/:id', getDetailsView);

//EMPLOYEES CREATE

router.get('/employees/create', getCreateView);
  
router.post('/employees/create', addEmployee);

//EMPLOYEES EDIT

router.get('/employees/edit/:id', getEmployeeEditPage);

router.post('/employees/edit/:id', updateEmployee);

//EMPLOYEES DELETE

router.get('/employees/delete/:id', deleteEmployee);

module.exports = {
    routes: router
}
    


