const joi = require('joi');

module.exports = joi.object({
    name: joi.string().required().max(100),
    email: joi.string().required().max(100).email(),
    password: joi.string().required().max(50),
    role: joi.string().default('user').max(8)
})