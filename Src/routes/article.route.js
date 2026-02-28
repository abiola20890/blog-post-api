const express = require('express');

const {
    postArticle,
    getAllArticle,
    getArticleBYid,
    updateArticleBYid,
    deleteArticleBYid,
    searchArticle
} = require('../controllers/article.controller.js');

const {
    validateCreateArticle,
    validateUpdateArticle
} = require('../Validation/post.validation.js')

const  requireAuth  = require('../middlewares/requireAuth.js'); // Import authentication middleware

const router = express.Router(); // Create a new router instance
router.use(requireAuth); // Apply authentication middleware to all routes in this router





router.post('/articles',  validateCreateArticle, postArticle);
router.get('/articles',  getAllArticle);
router.get('/articles/search', searchArticle);
router.get('/articles/:id',  getArticleBYid);
router.put('/articles/:id',  validateUpdateArticle, updateArticleBYid);
router.delete('/articles/:id',  deleteArticleBYid);




module.exports = router;