var Purchase = require("../models/PurchaseModel");
var util = require("util");

//PURSHASES INDEX

const getAllPurchases = function(req, res){
    Purchase.find().exec(function(err, result){
        if(err){res.status(400)}
        res.render('purchases/index', {
            purchases: result,
            title: "Histórico de Compras"
        });
    });
}

//PURSHASES DETAILS

const getDetailsView = function(req, res){
    Purchase.findById(req.params.id).exec(function(err, result){
        if(err){res.status(400)}
        res.render('purchases/details', {
            purchase: result,
            title: "Histórico de Compras"
        });
    });
}

//PURSHASES CREATE

const getCreateView = function(req, res, next) {
    res.render('purchases/create', {title: "Histórico de Compras"});
}

const addPurchase = function(req, res){
    var purchase = Purchase(req.body);
    purchase.save((err) => {
        if(err){res.status(400)}
        console.log("Successfully created a purchase.");
        res.redirect('/purchases');
    })
}

//PURSHASES DELETE

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