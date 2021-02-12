const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    title: String,
    description: String,
});

module.exports = mongoose.model('Category', categorySchema);