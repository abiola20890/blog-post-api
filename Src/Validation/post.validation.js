const Joi = require("joi");

const createArticleSchema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    content: Joi.string().min(20).max(5000).required(),
    comment: Joi.string().min(1).max(1000).optional(),
    status: Joi.string().valid('draft', 'published').default('draft'),
    tags: Joi.string().optional()
}).options({ abortEarly: false, allowUnknown: false });

const validateCreateArticle = (req, res, next) => {
    console.log("Validating article creation data:", req.body); // Debug log to check incoming data
    const { error } = createArticleSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Validation error",
            errors: error.details.map(e => e.message)
        });
    }

    req.body = value;
    next();
};

const updateArticleSchema = Joi.object({
    title: Joi.string().min(5).max(100),
    content: Joi.string().min(20).max(5000),
    comment: Joi.string().min(1).max(1000),
    status: Joi.string().valid('draft', 'published'),
    tags: Joi.string()
})
.min(1) // 👈 At least one field required
.options({ abortEarly: false, allowUnknown: false });

const validateUpdateArticle = (req, res, next) => {
    const { error } = updateArticleSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Validation error",
            errors: error.details.map(e => e.message)
        });
    }

    req.body = value;
    next();
};

module.exports = {
    validateCreateArticle, 
    validateUpdateArticle   
}