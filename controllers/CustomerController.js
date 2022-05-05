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

const getDetailsView = function(req, res){
    Customer.findById(req.params.id).exec(function(err, result){
        if(err){res.status(400)}
        res.render('customers/details', {
            customer: result,
            title: "Clientes",
        });
    });
}

const getCreateView = function(req, res, next) {
    res.render('customers/create', {title: "Clientes"});
}

const addCustomer = function(req, res){
    var customer = Customer(req.body);
    var query = req.body.nif;

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

const getCustomerEditPage = function(req, res){
    Customer.findOne({_id: req.params.id}).exec(function(err, customer){
        if(err){res.status(400)}
        res.render('customers/edit', {
            customer: customer,
            title: "Clientes"
        })
    });
}

const updateCustomer = function(req, res){
    Customer.findByIdAndUpdate(req.params.id, req.body, {runValidators:true},  function(err, customer){
        if(err){
            console.log(err);
        }
        res.redirect("/customers")
    });
}

const deleteCustomer = function(req, res){
    Customer.remove({_id: req.params.id}, function(err){
        if(err){res.status(400)}
        console.log(err);
        console.log("Successfully deleted a customer.");
        res.redirect('/customers');
    })
}

const customerSearchByNIF = function(req, res){
    Customer.findOne({nif: req.params.NIF}).exec(function(err, result){
        if(err){res.status(400)}
        res.send(result);
    });
}

module.exports = {
    getAllCustomers,
    getCreateView,
    addCustomer,
    getDetailsView,
    getCustomerEditPage,
    updateCustomer,
    deleteCustomer,
    customerSearchByNIF
}