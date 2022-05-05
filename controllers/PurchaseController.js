var Purchase = require("../models/PurchaseModel");
var util = require("util");

const getAllPurchases = function(req, res){
    Purchase.find().exec(function(err, result){
        if(err){res.status(400)}
        res.render('purchases/index', {
            purchases: result,
            title: "Histórico de Compras"
        });
    });
}

const getCreateView = function(req, res, next) {
    res.render('purchases/create', {title: "Histórico de Compras"});
}

const addPurchase = function(req, res){
    var purchase = Purchase(req.body);
    // res.end(util.inspect(req.body));
    purchase.save((err) => {
        if(err){res.status(400)}
        console.log("Successfully created a purchase.");
        res.redirect('/purchases');
    })
}

module.exports = {
    getAllPurchases,
    getCreateView,
    addPurchase

}