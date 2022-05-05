var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const {getAllPurchases, getCreateView, addPurchase} = require("../controllers/PurchaseController");

//Purchases INDEX

/* GET Purchases Index page. */
router.get('/purchases', getAllPurchases);

//Purchases CREATE

/* GET Purchases Create page. */
router.get('/purchases/create', getCreateView);

router.post('/purchases/create', addPurchase);


module.exports = {
  routes: router
}