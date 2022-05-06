var Purchase = require("../models/PurchaseModel");
var Customer = require("../models/CustomerModel");
var util = require("util");

//PURCHASES INDEX

const getAllPurchases = function(req, res){
    Purchase.find().exec(function(err, result){
        if(err){res.status(400)}
        res.render('purchases/index', {
            purchases: result,
            title: "Histórico de Compras"
        });
    });
}

//PURCHASES DETAILS

const getDetailsView = function(req, res){
    Purchase.findById(req.params.id).exec(function(err, result){
        if(err){res.status(400)}
        res.render('purchases/details', {
            purchase: result,
            title: "Histórico de Compras"
        });
    });
}

//PURCHASES CREATE

const getCreateView = function(req, res, next) {
    res.render('purchases/create', {title: "Histórico de Compras"});
}

const addPurchase = function(req, res){
    var purchase = Purchase(req.body);
    purchase.save((err) => {
        if(err){res.status(400)}
        var points = 0
        if (Array.isArray(req.body.price)){
            for(let i=0; i<req.body.price.length;i++)
            points = points + Number(req.body.price[i]) * req.body.quantity[i];
        }
        else
            points = req.body.price
        
        points = Math.floor(points/10)*200;
        Customer.findOneAndUpdate({nif:req.body.nif}, {$inc:{ points: points }},function(err){
            console.log("Successfully created a purchase.");
            res.redirect('/purchases');
        })
    })
}

//PURCHASES DELETE

const deletePurchase = function(req, res){
    Purchase.remove({_id: req.params.id}, function(err){
        if(err){res.status(400)}
        console.log("Successfully deleted a purchase.");
        res.redirect('/purchases');
    })
}

module.exports = {
    getAllPurchases,
    getDetailsView,
    getCreateView,
    addPurchase,
    deletePurchase
}