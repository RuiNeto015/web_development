var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function connectToMongoDB(){
    mongoose.connect('mongodb+srv://pawgrupo10:pawgrupo10@cluster0.e5a7n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority;')
    .then(() =>
        console.log('Connection Successful!'))
    .catch((err) => 
        console.error(err));
}
