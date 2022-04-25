var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://pawgrupo10:pawgrupo10@cluster0.e5a7n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority;')
    .then(() =>
        console.log('Connection Successful!'))
    .catch((err) => 
        console.error(err));

var EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    address : String,
    phoneNumber: Number,
    nif: Number,
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Employee', EmployeeSchema);