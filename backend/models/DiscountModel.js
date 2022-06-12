var mongoose = require('mongoose');

const typeValidation = (type) => {
    if(type != null && type != "" && (type == "Age" || type == "Purchases" || type == "Value")){
        return true;
    }
}

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
        required: true,
        validate: [typeValidation]
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