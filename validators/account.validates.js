const Joi = require('joi');

// login işlemi için gerekli model validator
const loginModelValidateSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,16}$'))
});

// yeni kullanıcı kayıt işlemi için gerekli model validator
const addNewUserModelValidateSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{6,16}$'))
        .required(),
    
    role: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
});

module.exports = {
    loginModelValidateSchema,
    addNewUserModelValidateSchema
}