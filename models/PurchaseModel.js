var mongoose = require('mongoose');

var PurchaseSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Purchase', PurchaseSchema);
