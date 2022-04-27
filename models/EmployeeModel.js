var mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://pawgrupo10:pawgrupo10@cluster0.e5a7n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority;')
    .then(() =>
        console.log('Connection Successful!'))
    .catch((err) => 
        console.error(err));


var EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [10, 'Número máximo de caracteres é 75, foram inseridos {VALUE}'],
        required: true
    },
    email: {
        type: String,
        maxlength: [75, 'Número máximo de caracteres é 75, foram inseridos {VALUE}'],
        required: true
    },
    password: {
        type: String,
        maxlength: [15, 'Número máximo de caracteres é 15, foram inseridos {VALUE}'],
        minlength: [5, 'Número mínimo de caracteres é 5, foram inseridos {VALUE}'],
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    birth_date: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        maxlength: [100, 'Número máximo de caracteres é 100, foram inseridos {VALUE}'],
        required: true
    },
    phoneNumber: {
        type: Number,
        maxlength: [9, 'Número máximo de dígitos é 9, foram inseridos {VALUE}'],
        minlength: [9, 'Número mínimo de dígitos é 9, foram inseridos {VALUE}'],
        pattern: "[0-9]{9}",
        required: true
    },
    nif: {
        type: Number,
        maxlength: [9, 'Número máximo de dígitos é 9, foram inseridos {VALUE}'],
        minlength: [9, 'Número mínimo de dígitos é 9, foram inseridos {VALUE}'],
        pattern: "[0-9]{9}",
        required: true
    },
    updated_at: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);