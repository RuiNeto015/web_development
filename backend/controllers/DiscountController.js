var Discount = require("../models/DiscountModel");
var discountController = {}


discountController.getAllDiscounts = function(req, res) {
    Discount.find({}, function(err, discounts) {
        if (err) res.status(500).send(err);
        res.json(discounts);
    });
}

discountController.createDiscount = function(req, res) {
    var discount = new Discount(req.body);
    discount.save(function(err, discount) {
        if (err) res.status(500).send(err);
        res.json(discount);
    });
}




module.exports = discountController;