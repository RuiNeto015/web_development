var mongoose = require('mongoose');

var PurchaseSchema = new mongoose.Schema({}, { strict: false });

module.exports = mongoose.model('Purchase', PurchaseSchema);
