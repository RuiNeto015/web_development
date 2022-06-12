var Discount = require("../models/DiscountModel");
var Customer = require("../models/CustomerModel");
var User = require("../models/UserModel");
var Purchase = require("../models/PurchaseModel");

var discountController = {}

discountController.getDiscount = function(req, res) {
    Discount.findOne({ code: req.params.code }, function(err, discount) {
        if (err) return res.status(500).send(err);
        return res.status(200).json(discount);
    });
}

discountController.getAgeDiscount = function(req, res) {
    Discount.findOne({ code: { $regex: req.params.search, $options: "i" } }, function(err, discount) {
        if (err) return res.status(500).send(err);
        return res.status(200).json(discount);
    });
}

discountController.getPurchaseDiscount = function(req, res) {
    Discount.findOne({ user: req.userId, percentage: req.params.search, type: "Purchases" }, function(err, discount) {
        if (err) return res.status(500).send(err);
        return res.status(200).json(discount);
    });
}

discountController.createPurchaseDiscount = function(req, res) {
    req.body.code = Math.random().toString(36).substring(2,12);
    req.body.type = "Purchases";
    req.body.uses = 3;
    req.body.user = req.userId;

    Discount.findOne({ user: req.body.user, type: req.body.type, percentage: req.body.percentage}, function(err, discount) {
        if (err) return res.status(500).send(err);
        if (discount) return res.status(400).json("Desconto já resgatado!");

        User.findOne({ _id: req.userId }, function(err, user) {
            if (err) res.status(500).send(err);
            Purchase.find({ user: user.email }, function(err, purchases) {
                if (err) res.status(500).send(err);
                switch (req.body.percentage) {
                    case 10:
                        if (purchases.length < 5) return res.status(400).json("Não tem os requesitos necessarios!")
                        break;
                    case 15:
                        if (purchases.length < 10) return res.status(400).json("Não tem os requesitos necessarios!")
                        break;
                    case 20:
                        if (purchases.length < 20) return res.status(400).json("Não tem os requesitos necessarios!")
                        break;
                    default:
                        return res.status(400).json("Não tem os requesitos necessarios 4!")
                }
                var discount = new Discount(req.body);
                discount.save(function(err, discount) {
                    if (err) res.status(500).send(err);
                    res.json(discount);
                });
            });
        });
    });

}

discountController.getValueDiscount = function(req, res) {
    Discount.findOne({ user: req.userId, percentage: req.params.search, type: "Value", uses:{$ne:0}}, function(err, discount) {
        if (err) return res.status(500).send(err);
        return res.status(200).json(discount);
    });
}

discountController.createValueDiscount = function(req, res) {
    req.body.code = Math.random().toString(36).substring(2,12);
    req.body.type = "Value";
    req.body.uses = 1;
    req.body.user = req.userId;

    Discount.findOne({ user: req.body.user, type: req.body.type, percentage: req.body.percentage, uses:{$ne:0}}, function(err, discount) {
        if (err) return res.status(500).send(err);
        if (discount) return res.status(400).json("Desconto já resgatado!");
        User.findOne({ _id: req.userId }, function(err, user) {
            if (err) res.status(500).send(err);
            switch (req.body.percentage) {
                case 10:
                    var cust = 500;
                    break;
                case 20:
                    var cust = 1000;
                    break;
                case 40:
                    var cust = 2000;
                    break;
                default:
                    return res.status(400).json("Não tem os requesitos necessarios!")
            }
            if(cust){
                Customer.findOne({ email: user.email }, function(err, customer) {
                    if(err) res.status(500).send(err);
                    if(customer.points-cust < 0) return res.status(400).json("Não tem pontos sufecientes!");
                    Customer.updateOne({_id:customer._id},{points:customer.points-cust},function(err, customer) {
                        if(err) res.status(500).send(err);
                        var discount = new Discount(req.body);
                        discount.save(function(err, discount) {
                            if (err) res.status(500).send(err);
                            return res.status(200).json(discount);
                        }); 
                    });       
                });
            }
        });
        
    });
}


function validateAge(customer, discountCode) {
    var age = new Date().getFullYear() - new Date(customer.birth_date).getFullYear();
    if (discountCode.includes("Infantil")) {
        return age < 12;
    } else if (discountCode.includes("Juvenil")) {
        return age < 19;
    } else if (discountCode.includes("Adulto")) {
        return age < 31;
    }else if (discountCode.includes("Senior")) {
        return age >= 60;
    }
    else {
        return false;
    }

}

function validatePurchaseDiscount(userId, discount) {
    return userId == discount.user && discount.uses > 0;
}

discountController.validateDiscount = function(req, res) {
    var discountCode = req.params.code;
    Discount.findOne({ code: discountCode }, function(err, discount) {
        if (err) return res.status(500).send(err);
        if (!discount) return res.status(400).send("Código de desconto inválido!");
        User.findOne({ _id: req.userId }, function(err, user) {
            if (err) return res.status(500).send(err);
            Customer.findOne({ email:user.email }, function(err, customer) {
                if (err) return res.status(500).send(err);
                switch (discount.type) {
                    case "Age":
                        if (!validateAge(customer, discount.code)) return res.status(400).send("Não tem os requesitos necessarios!");
                        return res.status(200).json(discount);
                    case "Purchases":
                        if (!validatePurchaseDiscount(user.email, discount)) return res.status(400).send("Não tem os requesitos necessarios!");
                        return res.status(200).json(discount);
                    default:
                        return res.status(400).json("Desconto inválido!");
                }
            });
        });
    });
}

module.exports = discountController;