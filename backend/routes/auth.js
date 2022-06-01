var express = require('express');
var router = express.Router();
const req = require('express/lib/request');
var authController = require('../controllers/AuthController');
var userController = require('../controllers/UserController');

router.post('/login', authController.login);
router.post('/resgister', authController.register);
router.post('/logout', authController.logout);
router.post('/profile', authController.profile);

router.get('/all-users', authController.verifyToken, authController.verifyRoleAdmin, userController.getAllUsers)

module.exports = {
  routes: router
}