const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 255 },
    roles: { type: Array, required: true }
});

module.exports = mongoose.model('User', userSchema);