var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const {getAllPurchases, getDetailsView, getCreateView, addPurchase, deletePurchase} = require("../controllers/PurchaseController");

//PURSHASES INDEX

router.get('/purchases', getAllPurchases);

//PURSHASES DETAILS

router.get('/purchases/details/:id', getDetailsView);

//PURSHASES CREATE

router.get('/purchases/create', getCreateView);

router.post('/purchases/create', addPurchase);

//BOOKS DELETE

router.get('/purchases/delete/:id', deletePurchase);

module.exports = {
  routes: router
}