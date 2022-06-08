var Customer = require("../models/CustomerModel");
var User = require("../models/UserModel");
var customerController = {}

//CUSTOMERS INDEX

customerController.getAllCustomers = function(req, res){
    Customer.find().exec(function(err, result){
        if(err){res.status(400)}
        res.render('customers/index', {
            customers: result,
            title: "Clientes"
        });
    });
}

//CUSTOMERS DETAILS

customerController.getDetailsView = function(req, res){
    Customer.findById(req.params.id).exec(function(err, result){
        if(err){res.status(400)}
        res.render('customers/details', {
            customer: result,
            title: "Clientes",
        });
    });
}

//CUSTOMERS CREATE

customerController.getCreateView = function(req, res, next) {
    res.render('customers/create', {title: "Clientes"});
}

customerController.addCustomer = function(req, res){
    var customer = Customer(req.body);
    var query = req.body.nif;

    req.body.type = 'Customer';
    var user = User(req.body);
    var queryEmail = req.body.email;

    User.findOne({email:queryEmail}, function(err, dup){
        if(err) console.log(err);
        if(dup){
            res.send("Este email já existe na base de dados!");
            
        }else{
            user.save((err) => {
                if(err){res.status(400)}
                console.log("Successfully created a user.");
            });
        }
    })

    Customer.findOne({nif:query}, function(err, dup){
        if(err) console.log(err);
        if(dup){
            console.log("Este NIF já existe na base de dados!");
            res.render('customers/create', {title: "Clientes", error: "Este NIF já existe na base de dados!"});
            
        }else{
            customer.save((err) => {
                if(err){res.status(400)}
                console.log("Successfully created a customer.");
                res.redirect('/customers');
            })
        }
    })
}

//CUSTOMERS EDIT

customerController.getCustomerEditPage = function(req, res){
    Customer.findOne({_id: req.params.id}).exec(function(err, customer){
        if(err){res.status(400)}
        res.render('customers/edit', {
            customer: customer,
            title: "Clientes"
        })
    });
}

customerController.updateCustomer = function(req, res){
    Customer.findByIdAndUpdate(req.params.id, req.body, {runValidators:true},  function(err, customer){
        if(err){
            console.log(err);
        }
        res.redirect("/customers")
    });
}

//CUSTOMERS DELETE

customerController.deleteCustomer = function(req, res){
    Customer.remove({_id: req.params.id}, function(err){
        if(err){res.status(400)
            console.log(err);}
        console.log("Successfully deleted a customer.");
        res.redirect('/customers');
    })
}

//CUSTOMERS SEARCH BY

customerController.customerSearchByNIF = function(req, res){
    Customer.findOne({nif: req.params.NIF}).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}

//CUSTOMERS FILTER BY

customerController.customerFilterByName = function(req, res){
    Customer.find({ name: { $regex: req.params.name, $options: "i" } }).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}

customerController.customerFilterByNIF = function(req, res){
    Customer.find({nif: req.params.NIF}).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}

customerController.customerFilterByEmail = function(req, res){
    Customer.find({ email: { $regex: req.params.email, $options: "i" } }).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}

module.exports = customerController;