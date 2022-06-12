var mongoose = require("mongoose");

const nifValidation = (nif) => {
    if(nif != null && nif != "" && nif.length == 9){
        return true;
    }
}

const nameValidation = (name) => {
    if(name != null && name != "" && name.length <= 75){
        return true;
    }
}

const emailValidation = (email) => {
    emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if(email != null && email != "" && email.length <= 75 && emailRegexp.test(email)){
        return true;
    }
}

const phoneNumberValidation = (phoneNumber) => {
    if(phoneNumber != null && phoneNumber != "" && phoneNumber.length == 9){
        return true;
    }
}

const addressValidation = (address) => {
    if(address != null && address != "" && address.length <= 100){
        return true;
    }
}

const isbnValidation = (isbn) => {
    if(isbn != null && isbn != "" && isbn.length >= 10 && isbn.length <= 13){
        return true;
    }
}

const titleValidation = (title) => {
    if(title != null && title != "" && title.length <= 75){
        return true;
    }
}

const conditionValidation = (condition) => {
    if(condition != null && condition != "" && (condition == "Novo" || condition == "Usado")){
        return true;
    }
}

const quantityValidation = (quantity) => {
    if(quantity != null && quantity != "" && quantity > 0){
        return true;
    }
}

const priceValidation = (price) => {
    if(price != null && price != "" && price > 0){
        return true;
    }
}

var PurchaseSchema = new mongoose.Schema({
    nif: {
        type: Number,
        required: true,
        validate: [nifValidation]
    },
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true,
        validate: [nameValidation]
    },
    email: {
        type: String,
        required: true,
        validate: [emailValidation]
    },
    phoneNumber: {
        type: Number,
        required: true,
        validate: [phoneNumberValidation]
    },
    address: {
        type: String,
        required: true,
        validate: [addressValidation]
    },
    isbn: {
        type: [Number],
        required: true,
        validate: [isbnValidation]
    },
    title: {
        type: [String],
        required: true,
        validate: [titleValidation]
    },
    condition: {
        type: [String],
        required: true,
        validate: [conditionValidation]
    },
    quantity: {
        type: [Number],
        required: true,
        validate: [quantityValidation]
    },
    price: {
        type: [String],
        required: true,
        validate: [priceValidation]
    },
    discountCode: {
        type: String,
        nullable: true
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
