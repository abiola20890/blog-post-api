const ArticleModel = require("../models/article.model.js")

const postArticle = async (req, res, next) => {
  
    try{
        const newArticle = new ArticleModel({
            title: req.body.title,
            content: req.body.content,
            author: req.user._id, // this helps to generate the author of the article, which is the user that is currently logged in
            comment: req.body.comment,
            status: req.body.status,
            tags: req.body.tags
        });
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
        console.log(req.user)
        const articles = await ArticleModel.find({}).populate('author', 'name _id email')
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
  const { title, content, comment, status, tags } = req.body;

  try {
    const article = await ArticleModel.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: `Article with ID ${req.params.id} not found`
      });
    }

    // Authorization check
    if (article.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this article"
      });
    }

    // Ensure at least one field is provided
    if (!title && !content && !comment && !status && !tags) {
      return res.status(400).json({
        message: "At least one field must be provided for update"
      });
    }

    // Apply updates
    if (title) article.title = title;
    if (content) article.content = content;
    if (comment) article.comment = comment;
    if (status) article.status = status;
    if (tags) article.tags = tags;

    await article.save();

    return res.status(200).json({
      message: "Article updated successfully",
      data: article
    });

  } catch (error) {
    console.error("Error updating article:", error);
    next(error);
  }
};

const deleteArticleBYid = async (req, res, next) => {
    try{
        const deletedArticle = await ArticleModel.findById(req.params.id);
        
        if (!deletedArticle) {
            return res.status(404).json({
             message: `Article with ID ${req.params.id} not found`})
        }
        if (deletedArticle.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this article"
            })
        }
        
        
        await deletedArticle.remove()

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