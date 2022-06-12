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

const genderValidation = (gender) => {
    if(gender != null && gender != "" && gender.length <= 1 && (gender == "M" || gender =="F")){
        return true;
    }
}

const addressValidation = (address) => {
    if(address != null && address != "" && address.length <= 100){
        return true;
    }
}

const phoneNumberValidation = (phoneNumber) => {
    if(phoneNumber != null && phoneNumber != "" && phoneNumber.length == 9){
        return true;
    }
}

const nifValidation = (nif) => {
    if(nif != null && nif != "" && nif.length == 9){
        return true;
    }
}

var EmployeeSchema = new mongoose.Schema({
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
        validate: [genderValidation]
    },
    birth_date: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        maxlength: [100, 'Número máximo de caracteres é 100, foi inserido: {VALUE}'],
        required: true,
        validate: [addressValidation]
    },
    phoneNumber: {
        type: Number,
        maxlength: [9, 'Número máximo de dígitos é 9, foi inserido: {VALUE}'],
        minlength: [9, 'Número mínimo de dígitos é 9, foi inserido: {VALUE}'],
        required: true,
        validate: [phoneNumberValidation]
    },
    nif: {
        type: Number,
        maxlength: [9, 'Número máximo de dígitos é 9, foi inserido: {VALUE}'],
        minlength: [9, 'Número mínimo de dígitos é 9, foi inserido: {VALUE}'],
        required: true,
        validate: [nifValidation]
    },
    created_at: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);