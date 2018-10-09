let books = require('../models/books');
let express = require('express');
let router = express.Router();

//List all books
router.findAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(books,null,5));
    // Return a JSON representation of our list
    if (books != null) {
        res.json(books);
    } else {
        res.send('Books NOT Found!');
    }
}

//Find and list one book
router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var book = getByValue(books,req.params.id);

    if (book != null)
        res.send(JSON.stringify(book,null,5));
    else
        res.send('Donation NOT Found!!');

}

router.addBook = (req, res) => {
    //Add a new book to our list
    var id = Math.floor((Math.random() * 1000000) + 1); //Randomly generate an id

    var currentSize = books.length;

    books.push({"id" : id, "author" : req.body.author, "stock" : req.body.stock, "bookCondition" : req.body.bookCondition});

    if((currentSize + 1) == books.length)
        res.json({ message: 'Book Added!'});
    else
        res.json({ message: 'Book NOT Added!'});
}

function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}

module.exports = router;