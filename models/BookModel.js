var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    isbn: String,
    edition: Date,
    editor : String,
    language : String,
    pages: Number,
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Book', BookSchema);