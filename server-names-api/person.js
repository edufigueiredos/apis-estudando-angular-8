const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
   firstName: String,
   lastName: String,
   email: String,
   city: String,
   country: String
});

module.exports = mongoose.model('Person', personSchema);