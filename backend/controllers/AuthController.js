var User = require('../models/UserModel');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require("../public/js/authconfig");

var authController = {};

authController.login = function(req, res){
    User.findOne({email: req.body.email}, function (err, user){
        if(err) return res.status(500).send('Error on the server.');
        if(!user) return res.status(404).send('No user found.');
        
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid) return res.status(401).send({auth: false, token: null});

        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400
        });

        res.status(200).send({auth: true, token: token});
    });
}

authController.logout = function(req, res){
    res.status(200).send({auth: false, token: null});
}

authController.register = function (req, res, next) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
    User.create(
      {
        email: req.body.email,
        password: hashedPassword,
      },
      function (err, user) {
        if (err)
          return res
            .status(500)
            .send("There was a problem registering the user.");

        var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: 86400
        });
  
        res.status(200).send({ auth: true, token: token });
    });
};
  
authController.profile = function (req, res, next) {
    User.findById(req.userId, function (err, user) {
        if (err)
            return res.status(500).send("There was a problem finding the user.");
        if (!user) 
            return res.status(404).send("No user found.");

        res.status(200).send(user);
    });
};

//middleware
authController.verifyToken = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers["x-access-token"];
    if(!token)
        return res.status(500).send({ auth: false, message: 'No token provided.' });
    
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        // if everything is good, save to request for use in other routes
        req.userId = decoded.id;
        next();
    });
}

authController.verifyRoleAdmin = function (req, res, next) {
    User.findById(req.userId, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        if (user.type !== 'admin') return res.status(403).send({ auth: false, message: 'Not authorized!'});
        next();
    });
}

authController.verifyRoleEmployee = function (req, res, next) {
    User.findById(req.userId, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        if (user.type !== 'Employee') return res.status(403).send({ auth: false, message: 'Not authorized!'});
        next();
    });
}

module.exports = authController;