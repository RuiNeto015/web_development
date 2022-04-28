var Customer = require("../models/CustomerModel");

const getAllCustomers = function(req, res){
    Customer.find().exec(function(err, result){
        if(err){res.status(400)}
        res.render('customers/index', {
            customers: result,
            title: "Clientes"
        });
    });
}

const getCreateView = function(req, res, next) {
    res.render('customers/create', {title: "Clientes"});
}

const addCustomer = function(req, res){
    var customer = Customer(req.body);

    customer.save((err) => {
        if(err){res.status(400)}
        console.log("Successfully created a customer.");
        res.redirect('/customers');
    })
}

const getDetailsView = function(req, res){
    Customer.findById(req.params.id).exec(function(err, result){
        if(err){res.status(400)}
        res.render('customers/details', {
            customer: result,
            title: "Clientes"
        });
    });
}

module.exports = {
    getAllCustomers,
    getCreateView,
    addCustomer,
    getDetailsView
}