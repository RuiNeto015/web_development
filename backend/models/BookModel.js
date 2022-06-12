var mongoose = require('mongoose');

const titleValidation = (title) => {
    if(title != null && title != "" && title.length <= 75){
        return true;
    }
}

const authorValidation = (author) => {
    if(author != null && author != "" && author.length <= 75){
        return true;
    }
}

const isbnValidation = (isbn) => {
    if(isbn != null && isbn != "" && isbn.length >= 10 && isbn.length <= 13){
        return true;
    }
}

const editorValidation = (editor) => {
    if(editor != null && editor != "" && editor.length <= 75){
        return true;
    }
}

const languageValidation = (language) => {
    if(language != null && language != "" && language.length <= 25){
        return true;
    }
}

const quantityValidation = (quantity) => {
    if(quantity != null && quantity != "" && quantity > 0){
        return true;
    }
}

const conditionValidation = (condition) => {
    if(condition != null && condition != "" && (condition == "Novo" || condition == "Usado")){
        return true;
    }
}

const pagesValidation = (pages) => {
    if(pages != null && pages != "" && pages > 0){
        return true;
    }
}

const priceValidation = (price) => {
    if(price != null && price != "" && price > 0){
        return true;
    }
}

var BookSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: [75, 'Número máximo de caracteres é 75, foi inserido {VALUE}'],
        required: true,
        validate: [titleValidation]
    },
    author: {
        type: String,
        maxlength: [75, 'Número máximo de caracteres é 75, foi inserido {VALUE}'],
        required: true,
        validate: [authorValidation]
    },
    isbn: {
        type: Number,
        maxlength: [13, 'Número máximo de caracteres é 13, foi inserido {VALUE}'],
        minlength: [10, 'Número mínimo de caracteres é 10, foi inserido {VALUE}'],
        required: true,
        validate: [isbnValidation]
    },
    editor: {
        type: String,
        maxlength: [75, 'Número máximo de caracteres é 75, foi inserido {VALUE}'],
        required: true,
        validate: [editorValidation]
    },
    language: {
        type: String,
        maxlength: [25, 'Número máximo de caracteres é 25, foi inserido {VALUE}'],
        required: true,
        validate: [languageValidation]
    },
    quantity: {
        type: Number,
        min: [0, 'Número mínimo é 0, foi inserido: {VALUE}'],
        required: true,
        validate: [quantityValidation]
    },
    condition: {
        type: String,
        required: true,
        validate: [conditionValidation]
    },
    pages: {
        type: Number,
        min: [0, 'Número mínimo é 0, foi inserido: {VALUE}'],
        required: true,
        validate: [pagesValidation]
    },
    price: {
        type: String,
        min: [0, 'Número mínimo é 0, foi inserido: {VALUE}'],
        required: true,
        validate: [priceValidation]
    },
    created_at: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Book', BookSchema);
