var mongoose = require("mongoose");
var Employee = require("../models/EmployeeModel");

const addEmployee = function(req, res){
    var employee = Employee(req.body);

    employee.save((err) => {
        if(err){return res.status(400)}
        console.log("Successfully created an employee.");
        res.redirect('/employees');
    })
}

module.exports= {
    addEmployee
}