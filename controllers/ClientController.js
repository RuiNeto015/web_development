var Client = require("../models/ClientModel");

const addClient = function(req, res){
    var client = Client(req.body);

    client.save((err) => {
        if(err){res.status(400)}
        console.log("Successfully created an client.");
        res.redirect('/clients');
    })
}

module.exports = {
    addClient
}