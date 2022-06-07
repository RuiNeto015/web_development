var User = require('../models/UserModel');
var Customer = require('../models/CustomerModel');

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
        if(user.type!="Customer") return res.status(200).send({auth: true, token: token, staff:true});
        res.status(200).send({auth: true, token: token});
    });
}

authController.logout = function(req, res){
    res.status(200).send({auth: false, token: null});
}


authController.register = function (req, res, next) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    req.body.password = hashedPassword;

    User.create(
      {
        email: req.body.email,
        password: hashedPassword,
      },
      function (err, user) {
        if (err){
            console.log(err);
            return res.status(500).send("There was a problem registering the user.");
        }

        var token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400
        });

        res.status(200).send({ auth: true, token: token });
    });
    
    req.body.type = 'Customer';
    var user = User(req.body);
    var queryEmail = req.body.email;
    req.body.password = hashedPassword;
    
    User.findOne({email:queryEmail}, function(err, dup){
        if(err) console.log(err);
        if(dup){
            res.send("Este email já existe na base de dados!");
            
        }else{
            user.save((err) => {
                if(err){res.status(400)}
                console.log("Successfully created a user.");
                res.status(200);
            })
        }
    })

    var customer = Customer(req.body);
    var query = req.body.nif;
    req.body.password = hashedPassword;

    Customer.findOne({nif:query}, function(err, dup){
        if(err) console.log(err);
        if(dup){
            console.log("Este NIF já existe na base de dados!");
            
        }else{
            customer.save((err) => {
                if(err){res.status(400)}
                console.log("Successfully created a customer.");
            })
        }
    })

    var token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 86400
    });

    res.status(200).send({ auth: true, token: token });
}

  
authController.profile = function (req, res, next) {
    User.findById(req.userId, function (err, user) {
        if (err)
            return res.status(500).send("There was a problem finding the user.");
        if (!user) 
            return res.status(404).send("No user found.");
        if(user.type=="Customer"){
            Customer.findOne({email: user.email}).exec(function(err, userInfo){
                if (err)
                    return res.status(500).send("There was a problem finding the user.");
                if (!userInfo)
                    return res.status(404).send("No user found.");
                res.status(200).json(userInfo);
            });
        }
    });
};


authController.verifyToken = function (req, res, next) {
    var token = req.headers["x-access-token"];
    if(!token && req.headers["authorization"]) 
        token = req.headers["authorization"].slice(7);
    if(!token)
        return res.status(500).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
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