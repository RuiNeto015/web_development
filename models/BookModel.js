var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://pawgrupo10:pawgrupo10@cluster0.e5a7n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority;')
    .then(() =>
        console.log('Connection Successful!'))
    .catch((err) => 
        console.error(err));

var BookSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: [75, 'Número máximo de caracteres é 75, foram inseridos {VALUE}'],
        required: true
    },
    author: {
        type: String,
        maxlength: [75, 'Número máximo de caracteres é 75, foram inseridos {VALUE}'],
        required: true
    },
    isbn: {
        type: Number,
        maxlength: [13, 'Número máximo de caracteres é 13, foram inseridos {VALUE}'],
        minlength: [10, 'Número mínimo de caracteres é 10, foram inseridos {VALUE}'],
        required: true
    },
    editor: {
        type: String,
        maxlength: [75, 'Número máximo de caracteres é 75, foram inseridos {VALUE}'],
        required: true
    },
    language: {
        type: String,
        maxlength: [25, 'Número máximo de caracteres é 25, foram inseridos {VALUE}'],
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
    created_at: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Book', BookSchema);
