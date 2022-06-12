var express = require('express');
var router = express.Router();
var discountController = require('../controllers/DiscountController');
var authController = require('../controllers/AuthController');

router.get('/getDiscount/:code', discountController.getDiscount);
router.get('/getAgeDiscount/:search', discountController.getAgeDiscount);
router.get('/getPurchaseDiscount/:search', authController.verifyToken, discountController.getPurchaseDiscount);
router.post('/createPurchaseDiscount', authController.verifyToken, discountController.createPurchaseDiscount);
router.post('/validateAgeDiscount', authController.verifyToken, discountController.validateAgeDiscount);

module.exports = {
    routes: router
  }