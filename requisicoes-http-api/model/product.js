const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    department: String,
    price: Number
});

module.exports = mongoose.model('Product', productSchema);