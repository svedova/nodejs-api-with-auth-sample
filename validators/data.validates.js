const Joi = require('joi');

const getByIdModelValidateSchema =
    Joi.string()
        .alphanum()
        .min(24)
        .max(24)
        .required();

const addModelValidateSchema = Joi.object({
    name: Joi.string()
        .max(60)
        .required(),

    desc: Joi.string()
        .max(250)
});

module.exports = {
    getByIdModelValidateSchema,
    addModelValidateSchema
}