var mongoose = require("mongoose");
var Employee = require("../models/EmployeeModel");

var EmployeeController = {};

const addEmployee = function(req, res){
    var employee = Employee(req.body);

    employee.save((err) => {
        if(err){
            console.log(err);
            res.render("../views/employees/create");
        } else{
            console.log("Successfully created an employee.");
            res.redirect("/employees");
        }
    })
}

module.exports= {
    addEmployee
}