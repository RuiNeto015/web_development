var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const {getAllPurchases, getDetailsView, getCreateView, addPurchase, deletePurchase,purchaseFilterByName,
  purchaseFilterByNIF,purchaseFilterByDate
} = require("../controllers/PurchaseController");

//PURCHASES INDEX

router.get('/purchases', getAllPurchases);

//PURCHASES DETAILS

router.get('/purchases/details/:id', getDetailsView);

//PURCHASES CREATE

router.get('/purchases/create', getCreateView);

router.post('/purchases/create', addPurchase);

//PURCHASES DELETE

router.get('/purchases/delete/:id', deletePurchase);

//EMPLOYEES FILTER BY

router.get('/purchases/filterByName/:name', purchaseFilterByName);

router.get('/purchases/filterByNIF/:NIF', purchaseFilterByNIF);

router.get('/purchases/filterByDate/:date', purchaseFilterByDate);

module.exports = {
  routes: router
}