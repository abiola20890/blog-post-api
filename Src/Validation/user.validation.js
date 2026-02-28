const Joi = require('joi');

const registerSchema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required()
    })

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required()
})


const validateRegisterUser = (req, res, next) => { 
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Validation error",
            errors: error.details.map(e => e.message)
        });
    }

    req.body = value;
    next();
};



const validateLoginUser = (req, res, next) => {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Validation error",
            errors: error.details.map(e => e.message)
        });
    }

    req.body = value;
    next();
}


module.exports = {
    validateRegisterUser,
    validateLoginUser
}