var mongoose = require('mongoose');

var ClientSchema = new mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    birth_date: Date,
    address : String,
    phoneNumber: Number,
    created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Client', ClientSchema);