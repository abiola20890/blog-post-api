require('dotenv').config();
const express = require('express');
const cors = require('cors');
const loggerMiddleware = require('./middlewares/logger.js');
const errorHandler = require('./middlewares/errorHandler.js');

const ArticleRoute = require('./routes/article.route.js');
const UserRoute = require('./routes/user.route.js');


// Create Express app instance
const app = express();



// Middleware
app.use(express.json());

app.use(cors('*')); // Allow CORS from any origin  

app.use(loggerMiddleware); // Custom logging middleware

app.use('/api', ArticleRoute); // Article routes
app.use('/api/users', UserRoute); // User routes

app.use(errorHandler); // Custom error handling middleware



module.exports = app;