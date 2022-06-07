var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        maxlength: [75, 'Número máximo de caracteres é 75, foi inserido: {VALUE}'],
        required: true
    },
    password: {
        type: String,
        maxlength: [100, 'Número máximo de caracteres é 15, foi inserido: {VALUE}'],
        minlength: [5, 'Número mínimo de caracteres é 5, foi inserido: {VALUE}'],
        required: true
    },
    type: {
        type: String,
        enum: ['Employee', 'Customer', 'Admin'],
        default: 'Customer'
    },
    created_at: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);