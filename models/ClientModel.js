var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: [10, 'Número máximo de caracteres é 75, foi inserido: {VALUE}'],
        required: true
    },
    email: {
        type: String,
        maxlength: [75, 'Número máximo de caracteres é 75, foi inserido: {VALUE}'],
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
    created_at: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Client', ClientSchema);