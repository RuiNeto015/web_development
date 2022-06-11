var express = require('express');
var router = express.Router();
var discountController = require('../controllers/DiscountController');
var authController = require('../controllers/AuthController');

router.get('/getDiscount/:code', discountController.getDiscount);
router.get('/getAgeDiscount/:search', discountController.getAgeDiscount);
router.post('/create-discount', authController.verifyToken, discountController.createDiscount);
router.post('/validate-discount', authController.verifyToken, discountController.validateDiscount);

module.exports = {
    routes: router
  }