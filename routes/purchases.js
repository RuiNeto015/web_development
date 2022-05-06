var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const {getAllPurchases, getDetailsView, getCreateView, addPurchase, deletePurchase} = require("../controllers/PurchaseController");

//PURCHASES INDEX

router.get('/purchases', getAllPurchases);

//PURCHASES DETAILS

router.get('/purchases/details/:id', getDetailsView);

//PURCHASES CREATE

router.get('/purchases/create', getCreateView);

router.post('/purchases/create', addPurchase);

//PURCHASES DELETE

router.get('/purchases/delete/:id', deletePurchase);

module.exports = {
  routes: router
}