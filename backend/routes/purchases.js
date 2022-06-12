var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const purchaseController = require("../controllers/PurchaseController");

//PURCHASES INDEX

router.get('/purchases', purchaseController.getAllPurchases);
router.get('/purchases/:nif', purchaseController.getUserPurchases);


//PURCHASES DETAILS

router.get('/purchases/details/:id', purchaseController.getDetailsView);

//PURCHASES CREATE

router.get('/purchases/create', purchaseController.getCreateView);

router.post('/purchases/create', purchaseController.addPurchase);

//PURCHASES DELETE

router.get('/purchases/delete/:id', purchaseController.deletePurchase);

//EMPLOYEES FILTER BY

router.get('/purchases/filterByName/:name', purchaseController.purchaseFilterByName);

router.get('/purchases/filterByNIF/:NIF', purchaseController.purchaseFilterByNIF);

router.get('/purchases/filterByDate/:date', purchaseController.purchaseFilterByDate);

module.exports = {
  routes: router
}