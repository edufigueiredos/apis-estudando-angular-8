const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    name: String
}, { versionKey: false });

module.exports = mongoose.model('Department', departmentSchema);