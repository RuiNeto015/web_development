var express = require('express');
var router = express.Router();
const customerController = require("../controllers/CustomerController");

//CUSTOMERS INDEX

router.get('/customers', customerController.getAllCustomers);

//CUSTOMERS DETAILS

router.get('/customers/details/:id', customerController.getDetailsView);

//CUSTOMERS CREATE

router.get('/customers/create', customerController.getCreateView);

router.post('/customers/create', customerController.addCustomer);

//CUSTOMERS EDIT

router.get('/customers/edit/:id', customerController.getCustomerEditPage);

router.post('/customers/edit/:id', customerController.updateCustomer);

//CUSTOMERS DELETE

router.get('/customers/delete/:id', customerController.deleteCustomer);

//CUSTOMERS SEARCH BY

router.get('/customers/searchByNIF/:NIF', customerController.customerSearchByNIF);

//CUSTOMERS FILTER BY

router.get('/customers/filterByName/:name', customerController.customerFilterByName);

router.get('/customers/filterByNIF/:NIF', customerController.customerFilterByNIF);

router.get('/customers/filterByEmail/:email', customerController.customerFilterByEmail);

module.exports = {
  routes: router
}