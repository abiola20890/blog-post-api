

const express = require('express');
const articleController = require('../controllers/article.controller.js');

const router = express.Router(); // Create a new router instance
const requireAuth = require('../middlewares/requireAuth.js');

router.post('/articles', requireAuth, articleController.postArticle);
router.get('/articles', requireAuth, articleController.getAllArticle);
router.get('/articles/search', requireAuth, articleController.searchArticle);
router.get('/articles/:id', requireAuth, articleController.getArticleBYid);
router.put('/articles/:id', requireAuth, articleController.updateArticleBYid);
router.delete('/articles/:id', requireAuth, articleController.deleteArticleBYid);




module.exports = router;