var Discount = require("../models/DiscountModel");
var Customer = require("../models/CustomerModel");
var User = require("../models/UserModel");

var discountController = {}

discountController.getDiscount = function(req, res) {
    Discount.findOne({ code: req.params.code }, function(err, discount) {
        if (err) res.status(500).send(err);
        res.json(discount);
    });
}

discountController.getAgeDiscount = function(req, res) {
    Discount.findOne({ code: { $regex: req.params.search, $options: "i" } }, function(err, discount) {
        if (err) res.status(500).send(err);
        res.json(discount);
    });
}

discountController.createDiscount = function(req, res) {

    discount.save(function(err, discount) {
        if (err) res.status(500).send(err);
        res.json(discount);
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

discountController.validateDiscount = function(req, res) {
    var discountCode = req.body.code;
    Discount.findOne({ code: discountCode }, function(err, discount) {
        if (err) res.status(500).send(err);
        if (!discount) res.status(400).send("Código de desconto inválido!");
        User.findOne({ _id: req.userId }, function(err, user) {
            if (err) res.status(500).send(err);
            Customer.findOne({ email:user.email }, function(err, customer) {
                if (err) res.status(500).send(err);
                if (discount.type == "Age") {
                    res.status(200).json(validateAge(customer, discount.code));
                }
            });
        });
    });
}




module.exports = discountController;