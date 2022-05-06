var Customer = require("../models/CustomerModel");

//LOGIN

function getLoginPage(req, res, next) {
    res.render('login', { title: 'Login' });
}

function verifyUser(req, res){
    var email1 = req.body.email;
    var password1 = req.body.password;
    Customer.findOne({email:email1, password:password1}, function(err, dup){
        if(err) console.log(err);
        if(dup){
            res.redirect('/');
        }else{
            res.render('login', {title: "Login", error: "Email ou palavra-passe inválidos!"});
        }
    });
}

module.exports = {
    getLoginPage,
    verifyUser
}