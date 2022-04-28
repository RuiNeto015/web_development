var express = require('express');
var router = express.Router();
const {getAllEmployees, getCreateView, addEmployee, getDetailsView} = require("../controllers/EmployeeController");

//EMPLOYEES INDEX

/* GET Employees Index page. */
router.get('/employees', getAllEmployees);

//EMPLOYEES CREATE

/* GET Employees Create page. */
router.get('/employees/create', getCreateView);
  
router.post('/employees/create', addEmployee);

router.get('/employees/details/:id', getDetailsView);

module.exports = {
    routes: router
}
    


