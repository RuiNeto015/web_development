var Employee = require("../models/EmployeeModel");

const getAllEmployees = function(req, res){
    Employee.find().exec(function(err, result){
        if(err){res.status(400)}
        res.render('employees/index', {
            employees: result,
            title: "Funcionários"
        });
    });
}

const addEmployee = function(req, res){
    var employee = Employee(req.body);

    employee.save((err) => {
        if(err){res.status(400)}
        console.log("Successfully created an employee.");
        res.redirect('/employees');
    })
}


const getDetailsView = function(req, res){
    Employee.findById(req.params.id).exec(function(err, result){
        if(err){res.status(400)}
        res.render('employees/details', {
            employee: result,
            title: "Funcionários"
        });
    });
}


module.exports = {
    getAllEmployees,
    addEmployee,
    getDetailsView
}