var Client = require("../models/ClientModel");

const getAllClients = function(req, res){
    Client.find().exec(function(err, result){
        if(err) res.status(400);
        res.render('clients/index', {
            clients: result,
            title: "Clientes"
        });
    });
}

const addClient = function(req, res){
    var client = Client(req.body);

    client.save((err) => {
        if(err){res.status(400)}
        console.log("Successfully created an client.");
        res.redirect('/clients');
    })
}

module.exports = {
    getAllClients,
    addClient
}