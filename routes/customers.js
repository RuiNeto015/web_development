var express = require('express');
var router = express.Router();
const {getAllCustomers, getCreateView, addCustomer, getDetailsView, deleteCustomer} = require("../controllers/CustomerController");

//Customer INDEX

/* GET Customer Index page. */
router.get('/customers', getAllCustomers);

//Customer CREATE

/* GET Customer Create page. */
router.get('/customers/create', getCreateView);

router.post('/customers/create', addCustomer);

router.get('/customers/details/:id', getDetailsView);

//Customer DELETE

router.delete('/customers/delete/:id', deleteCustomer);

module.exports = {
  routes: router
}