var express = require('express');
var router = express.Router();
const employeeController = require("../controllers/EmployeeController");

//EMPLOYEES INDEX

router.get('/employees', employeeController.getAllEmployees);

//EMPLOYEES DETAILS

router.get('/employees/details/:id', employeeController.getDetailsView);

//EMPLOYEES CREATE

router.get('/employees/create', employeeController.getCreateView);
  
router.post('/employees/create', employeeController.addEmployee);

//EMPLOYEES EDIT

router.get('/employees/edit/:id', employeeController.getEmployeeEditPage);

router.post('/employees/edit/:id', employeeController.updateEmployee);

//EMPLOYEES DELETE

router.get('/employees/delete/:id', employeeController.deleteEmployee);

//EMPLOYEES FILTER BY

router.get('/employees/filterByName/:name', employeeController.employeeFilterByName);

router.get('/employees/filterByNIF/:NIF', employeeController.employeeFilterByNIF);

router.get('/employees/filterByEmail/:email', employeeController.employeeFilterByEmail);

module.exports = {
    routes: router
}
    


