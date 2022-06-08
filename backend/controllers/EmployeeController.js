var Employee = require("../models/EmployeeModel");
var User = require("../models/UserModel");
var employeeController = {}
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require("../public/js/authconfig");

//EMPLOYEES INDEX

employeeController.getAllEmployees = function(req, res){
    Employee.find().exec(function(err, result){
        if(err){res.status(400)}
        res.render('employees/index', {
            employees: result,
            title: "Funcionários"
        });
    });
}

//EMPLOYEES DETAILS

employeeController.getDetailsView = function(req, res){
    Employee.findById(req.params.id).exec(function(err, result){
        if(err){res.status(400)}
        res.render('employees/details', {
            employee: result,
            title: "Funcionários"
        });
    });
}

//EMPLOYEES CREATE

employeeController.getCreateView = function(req, res, next) {
    res.render('employees/create', {title: "Funcionários"});
}

employeeController.addEmployee = function(req, res){
    var employee = Employee(req.body);
    var queryNif = req.body.nif;

    req.body.type = 'Employee';
    var user = User(req.body);
    var queryEmail = req.body.email;
    
    User.findOne({email:queryEmail}, function(err, dup){
        if(err) console.log(err);
        if(dup){
            res.send("Este email já existe na base de dados!");
            
        }else{
            var hashedPassword = bcrypt.hashSync(req.body.password, 8);
            user.password = hashedPassword;
            console.log(user);
            user.save((err) => {
                if(err){res.status(400)}
                console.log("Successfully created a user.");
                res.status(200);
            })
        }
    })

    Employee.findOne({nif:queryNif}, function(err, dup){
        if(err) console.log(err);
        if(dup){
            console.log("Este NIF já existe na base de dados!");
            res.render('employees/create', {title: "Funcionários", error: "Este NIF já existe na base de dados!"});
            
        }else{
            employee.save((err) => {
                if(err){res.status(400)}
                console.log("Successfully created an employee.");
                res.redirect('/employees');
            })
        }
    })
}

//EMPLOYEES EDIT

employeeController.getEmployeeEditPage = function(req, res){
    Employee.findOne({_id: req.params.id}).exec(function(err, employee){
        if(err){res.status(400)}
        res.render('employees/edit', {
            employee: employee,
            title: "Funcionários"
        })
    });
}

employeeController.updateEmployee = function(req, res){
    Employee.findByIdAndUpdate(req.params.id, req.body, {runValidators:true},  function(err, employee){
        if(err){
            console.log(err);
        }
        res.redirect("/employees")
    });
}

//EMPLOYEES DELETE

employeeController.deleteEmployee = function(req, res){
    Employee.deleteOne({_id: req.params.id}, function(err){
        if(err){res.status(400);
            console.log(err);}
        console.log("Successfully deleted a employee.");
        res.redirect('/employees');
    })
}

//EMPLOYEES FILTER BY

employeeController.employeeFilterByName = function(req, res){
    Employee.find({ name: { $regex: req.params.name, $options: "i" } }).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}

employeeController.employeeFilterByNIF = function(req, res){
    Employee.find({nif: req.params.NIF}).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}

employeeController.employeeFilterByEmail = function(req, res){
    Employee.find({ email: { $regex: req.params.email, $options: "i" } }).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}


module.exports = employeeController;