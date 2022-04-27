var express = require('express');
var router = express.Router();

/* GET Clients Index page. */
router.get('/clients', function(req, res, next) {
  res.render('clients/index', { title: 'Clientes' });
});

module.exports = {
  routes: router
}