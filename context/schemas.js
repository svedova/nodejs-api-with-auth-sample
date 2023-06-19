const mongoose = require('mongoose');

const TestSchema = mongoose.model('Test', new mongoose.Schema({
    name: String,
    desc: String
}));

const UserSchema = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    lastLoginDate: Date
}));

module.exports = {
    TestSchema,
    UserSchema
};