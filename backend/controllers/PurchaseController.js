var Purchase = require("../models/PurchaseModel");
var Customer = require("../models/CustomerModel");
var Book = require("../models/BookModel");
var Discount = require("../models/DiscountModel");
var purchaseController = {}

//PURCHASES INDEX

purchaseController.getAllPurchases = function(req, res){
    Purchase.find().exec(function(err, result){
        if(err){res.status(400)}
        res.render('purchases/index', {
            purchases: result,
            title: "Histórico de Compras"
        });
    });
}

purchaseController.getUserPurchases= function(req, res){

    Purchase.find({nif: req.params.nif}).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
} 

//PURCHASES DETAILS

purchaseController.getDetailsView = function(req, res){
    Purchase.findById(req.params.id).exec(function(err, result){
        if(err){res.status(400)}
        res.render('purchases/details', {
            purchase: result,
            title: "Histórico de Compras"
        });
    });
}

//PURCHASES CREATE

purchaseController.getCreateView = function(req, res, next) {
    res.render('purchases/create', {title: "Histórico de Compras"});
}

purchaseController.addPurchase = function(req, res){
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
        })

        for(let i = 0; i < req.body.isbn.length; i++){
            Book.findOneAndUpdate({isbn:req.body.isbn[i], condition: req.body.condition[i]}, 
                {$inc:{ quantity: -req.body.quantity[i] }},function(err){
                    console.log("Successfully updated book quantity.");
            })
        }

        if(req.body.discountCode){
            Discount.findOne({code: req.body.discountCode}, function(err, result){
                if(err){res.status(400)}
                if(result.uses){
                    Discount.updateOne({code: req.body.discountCode}, {$inc:{ uses: -1 }},function(err){
                        console.log("Successfully updated discount uses.");
                    });
                }
            });
        }
    })
}

//PURCHASES DELETE

purchaseController.deletePurchase = function(req, res){
    Purchase.remove({_id: req.params.id}, function(err){
        if(err){res.status(400)}
        console.log("Successfully deleted a purchase.");
        res.redirect('/purchases');
    })
}

//PURCHASES FILTER BY

purchaseController.purchaseFilterByName = function(req, res){
    Purchase.find({ name: { $regex: req.params.name, $options: "i" } }).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}

purchaseController.purchaseFilterByNIF = function(req, res){
    Purchase.find({nif: req.params.NIF}).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}

purchaseController.purchaseFilterByDate = function(req, res){
    var date1 = new Date(req.params.date)
    var date2 = new Date(req.params.date)
    date2.setDate(date2.getDate()+1)
    Purchase.find({date: {
        $gte: date1, 
        $lt: date2
    }}).exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}

module.exports = purchaseController;