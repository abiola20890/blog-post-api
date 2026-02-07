

const express = require('express');
const articleController = require('../controllers/article.controller.js');

const router = express.Router(); // Create a new router instance

router.post('/articles', articleController.postArticle);
router.get('/articles', articleController.getAllArticle);
router.get('/articles/search', articleController.searchArticle);
router.get('/articles/:id', articleController.getArticleBYid);
router.put('/articles/:id', articleController.updateArticleBYid);
router.delete('/articles/:id', articleController.deleteArticleBYid);




module.exports = router;