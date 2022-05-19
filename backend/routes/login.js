var express = require('express');
var router = express.Router();
const {getLoginPage, verifyUser} = require("../controllers/LoginController");

//LOGIN 

router.get('/', getLoginPage);

router.post('/', verifyUser);

module.exports = router;
