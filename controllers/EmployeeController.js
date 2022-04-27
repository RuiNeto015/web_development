var mongoose = require("mongoose");
var Employee = require("../models/EmployeeModel");

const addEmployee = function (req, res){
    var employee = Employee(req.body);

    //chamar validate

    employee.save((err) => {
        if(err){
            res.status(400)
        }
        res.redirect('/employees');
    })
}


module.exports= {
    addEmployee
}