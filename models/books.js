let mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
        bookName: String,
        author: String,
        stock: {type: Number, default: 1}
    },
    { collection: 'booksdb' });

module.exports = mongoose.model('Book', BookSchema);