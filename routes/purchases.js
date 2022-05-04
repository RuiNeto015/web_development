var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const {getAllPurchases} = require("../controllers/PurchaseController");

//BOOKS INDEX

/* GET Books Index page. */
router.get('/purchases', getAllPurchases);




module.exports = {
  routes: router
}