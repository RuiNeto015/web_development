var mongoose = require("mongoose");

var PurchaseSchema = new mongoose.Schema({
    nif: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    isbn: {
        type: [Number],
        required: true,
    },
    title: {
        type: [String],
        required: true,
    },
    condition: {
        type: [String],
        required: true,
    },
    quantity: {
        type: [Number],
        required: true,
    },
    price: {
        type: [String],
        required: true,
    },
    onlinePayment:{
        type: Object,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Purchase", PurchaseSchema);
