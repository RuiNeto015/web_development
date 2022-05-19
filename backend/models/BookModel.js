var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: [75, 'Número máximo de caracteres é 75, foi inserido {VALUE}'],
        required: true
    },
    author: {
        type: String,
        maxlength: [75, 'Número máximo de caracteres é 75, foi inserido {VALUE}'],
        required: true
    },
    isbn: {
        type: Number,
        maxlength: [13, 'Número máximo de caracteres é 13, foi inserido {VALUE}'],
        minlength: [10, 'Número mínimo de caracteres é 10, foi inserido {VALUE}'],
        required: true
    },
    editor: {
        type: String,
        maxlength: [75, 'Número máximo de caracteres é 75, foi inserido {VALUE}'],
        required: true
    },
    language: {
        type: String,
        maxlength: [25, 'Número máximo de caracteres é 25, foi inserido {VALUE}'],
        required: true
    },
    quantity: {
        type: Number,
        min: [0, 'Número mínimo é 0, foi inserido: {VALUE}'],
        required: true
    },
    condition: {
        type: String,
        required: true,
    },
    pages: {
        type: Number,
        min: [0, 'Número mínimo é 0, foi inserido: {VALUE}'],
        required: true
    },
    price: {
        type: String,
        min: [0, 'Número mínimo é 0, foi inserido: {VALUE}'],
        required: true
    },
    created_at: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Book', BookSchema);
