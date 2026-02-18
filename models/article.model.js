const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
    title: {
        type: String, required: true, minLength: 5, maxLength: 100
    },
    content: {
        type: String, required: true, minLength: 20, maxLength: 5000
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, required: true
    },
    comment: {
         type: String, required: false, minLength: 1, maxLength: 1000 
    },
     status: {
    type: String, enum: ['draft', 'published'], default: 'draft'
  },
  tags: {
    type: String
  }
}, 
{timestamps: true});

// Create a text index for full-text search
articleSchema.index({ title: 'text', content: 'text', tags: 'text' });

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;