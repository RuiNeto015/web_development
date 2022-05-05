var express = require('express');
var router = express.Router();
const {getAllCustomers, getCreateView, addCustomer, getDetailsView, getCustomerEditPage, updateCustomer, deleteCustomer, customerSearchByNIF} = require("../controllers/CustomerController");

//CUSTOMERS INDEX

router.get('/customers', getAllCustomers);

//CUSTOMERS DETAILS

router.get('/customers/details/:id', getDetailsView);

//CUSTOMERS CREATE

router.get('/customers/create', getCreateView);

router.post('/customers/create', addCustomer);

//CUSTOMERS EDIT

router.get('/customers/edit/:id', getCustomerEditPage);

router.post('/customers/edit/:id', updateCustomer);

//CUSTOMERS DELETE

router.get('/customers/delete/:id', deleteCustomer);

//CUSTOMERS SEARCH BY

router.get('/customers/searchByNIF/:NIF', customerSearchByNIF);

module.exports = {
  routes: router
}