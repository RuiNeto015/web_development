var mongoose = require('mongoose');

const nameValidation = (name) => {
    if(name != null && name != "" && name.length <= 75){
        return true;
    }
}

const emailValidation = (email) => {
    emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if(email != null && email != "" && email.length <= 75 && emailRegexp.test(email)){
        return true;
    }
}

var CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [75, 'Número máximo de caracteres é 75, foi inserido: {VALUE}'],
        required: true,
        validate: [nameValidation]
    },
    email: {
        type: String,
        unique: true,
        maxlength: [75, 'Número máximo de caracteres é 75, foi inserido: {VALUE}'],
        required: true,
        validate: [emailValidation]
    },
    gender: {
        type: String,
        required: true,
    },
    birth_date: {
        type: Date,
        required: false,
    },
    address: {
        type: String,
        maxlength: [100, 'Número máximo de caracteres é 100, foi inserido: {VALUE}'],
        required: true
    },
    phoneNumber: {
        type: Number,
        maxlength: [9, 'Número máximo de dígitos é 9, foi inserido: {VALUE}'],
        minlength: [9, 'Número mínimo de dígitos é 9, foi inserido: {VALUE}'],
        pattern: "[0-9]{9}",
        required: true
    },
    nif: {
        type: Number,
        maxlength: [9, 'Número máximo de dígitos é 9, foi inserido: {VALUE}'],
        minlength: [9, 'Número mínimo de dígitos é 9, foi inserido: {VALUE}'],
        pattern: "[0-9]{9}",
        required: true
    },
    points: {
        type: Number,
        default: 100
    },
    created_at: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);