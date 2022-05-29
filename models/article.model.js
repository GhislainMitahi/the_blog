const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: {type: String, required:true},
    content: {type: String, required:true},
    category: {type: String, required:true},
    image: {type: String, required:true},
    publishedAt: {type: Date, required:true}
});

module.exports = mongoose.model('Article', articleSchema);



// const articleSchema = mongoose.Schema({
//     title: String,
//     content: String,
//     category: String,
//     image: String,
//     publishedAt: Date
// });