var User = require('../models/UserModel');

var userController = {};

userController.getAllUsers = function(req, res){
    User.find().exec(function(err, result){
        if(err){res.status(400)}
        res.json(result);
    });
}

module.exports = userController;