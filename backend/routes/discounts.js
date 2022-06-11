var express = require('express');
var router = express.Router();
var discountController = require('../controllers/DiscountController');

router.get('/all-discounts', discountController.getAllDiscounts);
router.post('/create-discount', discountController.createDiscount);

module.exports = {
    routes: router
  }