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

const getCreateView = function(req, res, next) {
    res.render('employees/create', {title: "Funcionários"});
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

const deleteEmployee = function(req, res){
    
    Employee.remove({_id: req.params.id}, function(err){
        if(err){res.status(400)}
        console.log(err);
        console.log("Successfully deleted a employee.");
        res.redirect('/employees');
    })
}


module.exports = {
    getAllEmployees,
    getCreateView,
    addEmployee,
    getDetailsView,
    deleteEmployee
}