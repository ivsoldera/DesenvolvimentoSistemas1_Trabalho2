const joi = require('joi');

module.exports = joi.object({
    name: joi.string().required().max(100),
    ingredients: joi.string().required().max(100),
    preparation: joi.string().required().max(100)
})