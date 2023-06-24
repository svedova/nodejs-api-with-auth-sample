const mongoose = require('mongoose');

// Test isimli bir koleksiyon yapısı.
// Örnek verilerimizi tutacak.
const TestSchema = mongoose.model('Test', new mongoose.Schema({
    name: String,
    desc: String
}));

// User isimli bir koleksiyon yapısı. 
// Kullanıcı verilerini tutacak.
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