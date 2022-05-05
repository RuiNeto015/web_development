var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const {getAllPurchases, getCreateView, addPurchase} = require("../controllers/PurchaseController");

//PURSHASES INDEX

router.get('/purchases', getAllPurchases);

//PURSHASES CREATE

router.get('/purchases/create', getCreateView);

router.post('/purchases/create', addPurchase);

module.exports = {
  routes: router
}