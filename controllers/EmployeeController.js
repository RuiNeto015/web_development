var mongoose = require("mongoose");
var Employee = require("../models/EmployeeModel");

const addEmployee = function(req, res){
    var employee = Employee(req.body);

    employee.save(() => {
        console.log("Successfully created an employee.");
        res.render('../views/employees', {title:"Funcionários"});
    })
}

module.exports= {
    addEmployee
}