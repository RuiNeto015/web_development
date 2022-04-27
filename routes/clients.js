var express = require('express');
var router = express.Router();
const {addClient} = require("../controllers/ClientController");


/* GET Clients Index page. */
router.get('/clients', function(req, res, next) {
  res.render('clients/index', { title: 'Clientes' });
});

router.get('/clients/create', function(req, res, next) {
  res.render('clients/create', {title:"Clientes"});
});

router.post('/clients/create', addClient);

module.exports = {
  routes: router
}