var mongoose = require('mongoose');

var DiscountSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    percentage: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['Age', 'Purchases','Value'],
        required: true
    },
    uses: {
        type: Number,
        nullable: true
    },
    user: {
        type: String,
        ref: 'User',
        nullable: true
    },
    created_at: {
        type: Date, 
        default: Date.now
    }
});

module.exports = mongoose.model('Discount', DiscountSchema);