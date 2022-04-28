var express = require('express');
var router = express.Router();
const {getAllCustomers, getCreateView, addCustomer, getDetailsView} = require("../controllers/CustomerController");

//Customer INDEX

/* GET Customer Index page. */
router.get('/customers', getAllCustomers);

//Customer CREATE

/* GET Customer Create page. */
router.get('/customers/create', getCreateView);

router.post('/customers/create', addCustomer);

router.get('/customers/details/:id', getDetailsView);

module.exports = {
  routes: router
}