const Joi = require("joi")
const ArticleModel = require("../models/article.model.js")

const postArticle = async (req, res, next) => {
    const articleSchema = Joi.object({
        title: Joi.string().min(5).max(100).required(),
        content: Joi.string().min(20).max(5000).required(),
        author: Joi.string().max(50).default('Guest').optional(),
        comment: Joi.string().min(1).max(1000).optional(),
        status: Joi.string().valid('draft', 'published').default('draft'),
        tags: Joi.string().optional()
    
    })

    const { error, value } = articleSchema.validate(req.body)
    if (error) {
        return res.status(400).json
        ({
            message: "Validation error",
            details: error.details.map(detail => detail.message)
        })
    }
    try{
        const newArticle = new ArticleModel(value);
        await newArticle.save();
        return res.status(201).json({
            message: "Article created successfully",
            data: newArticle
        })

    } catch (error) {
        console.error("Error creating article:", error);
        next(error)
        

    }
}

const getAllArticle = async (req, res, next) => {
        const {limit = 10, page = 1} = req.query;
        const skip = (page - 1) * limit; // Calculate the number of documents to skip based on the page number and limit
    try{
        const articles = await ArticleModel.find({})
        .sort({createdAt: -1}) // Sort by createdAt in descending order
        .limit(parseInt(limit)) // Limit the number of results
        .skip(parseInt(skip)); // Skip the appropriate number of documents for pagination
        // what is pagination? 
        /*Pagination is a technique used to divide a large set of data into smaller, 
        more manageable chunks or pages. It allows users to navigate through the data 
        in a structured way, typically by providing links or buttons to move between pages. 
        In the context of web applications, pagination is often used to display a limited 
        number of items per page, improving performance and user experience when dealing 
        with large datasets*/
        return res.status(200).json({
            message: "Articles retrieved successfully",
            data: articles
        })

    } catch (error) {
        console.error("Error retrieving articles:", error);
        next(error)
    }
}

const getArticleBYid = async (req, res, next) => {
    try{
        const article = await ArticleModel.findById(req.params.id);
        if (!article) {
            return res.status(404).json({message: `Article with ID ${req.params.id} not found`})
        }
        return res.status(200).json({
            message: "Article retrieved successfully",
            data: article
        })

    } catch (error) {
        console.error("Error retrieving article:", error);
        next(error)
    }
}

const updateArticleBYid = async (req, res, next) => {
        const articleSchema = Joi.object({
        title: Joi.string().min(5).max(100).optional(),
        content: Joi.string().min(20).max(5000).optional(),
        author: Joi.string().max(50).optional(),
        comment: Joi.string().min(1).max(1000).optional(),
        status: Joi.string().valid('draft', 'published').optional(),
        tags: Joi.string().optional()
    
    })


    const { error, value } = articleSchema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: "Validation error"
        })

    }
    try{
        const updatedArticle = await ArticleModel.findByIdAndUpdate(req.params.id, value, {
            new: true,
            runValidators: true});
        if (!updatedArticle) {
            return res.status(404).json({
                message: `Article with ID ${req.params.id} not found`})
        }
        return res.status(200).json({
            message: "Article updated successfully",
            data: updatedArticle
        })

    } catch (error) {
        console.error("Error updating article:", error);
        next(error)
    }
}

const deleteArticleBYid = async (req, res, next) => {
    try{
        const deletedArticle = await ArticleModel.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({
             message: `Article with ID ${req.params.id} not found`})
        }
        return res.status(200).json({
            message: "Article deleted successfully",
            data: deletedArticle
        })
    } catch (error) {
        console.error("Error deleting article:", error);
        next(error)
    }
}


const searchArticle = async (req, res, next) => {
  try {
    const { query = '', page = 1, limit = 10 } = req.query;

    if (!query.trim()) {
      return res.status(400).json({ message: "Query cannot be empty" });
    }

    // Build text search condition
    const searchCondition = { $text: { $search: query } };

    const articles = await ArticleModel.find(searchCondition, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } }) // Sort by relevance
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('title author tags createdAt');

    const totalCount = await ArticleModel.countDocuments(searchCondition);

    return res.status(200).json({
      message: "Articles searched successfully",
      data: articles,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalCount / limit),
        totalResults: totalCount
      }
    });
  } catch (error) {
    console.error("Error searching articles:", error);
    next(error);
  }
};



module.exports = {
    postArticle,
    getAllArticle,
    getArticleBYid,
    updateArticleBYid,
    deleteArticleBYid,
    searchArticle
}