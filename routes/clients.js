var express = require('express');
var router = express.Router();
const {getAllClients,addClient} = require("../controllers/ClientController");

//CLIENTS INDEX

/* GET Clients Index page. */
router.get('/clients', getAllClients);

//CLIENTS CREATE

/* GET Clients Create page. */
router.get('/clients/create', function(req, res, next) {
  res.render('clients/create', {title: "Clientes"});
});

router.post('/clients/create', addClient);

module.exports = {
  routes: router
}